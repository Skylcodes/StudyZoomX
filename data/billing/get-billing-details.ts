import 'server-only';

import { cache } from 'react';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { mapSubscriptionToTier } from '@/lib/billing/map-subscription-to-tier';
import { pickSubscription } from '@/lib/billing/pick-subscription';
import { stripeServer } from '@/lib/billing/stripe-server';
import { displayNames } from '@/lib/billing/tier';
import { prisma } from '@/lib/db/prisma';
import {
  GatewayError,
  NotFoundError,
  PreConditionError
} from '@/lib/validation/exceptions';
import type { BillingLineItemDto } from '@/types/dtos/billing-breakdown-dto';
import type { BillingDetailsDto } from '@/types/dtos/billing-details-dto';

const DEFAULT_CURRENCY = 'usd';

function getTierNameFromLineItem(
  item: Stripe.InvoiceLineItem,
  subscriptions: Stripe.Subscription[]
): string {
  // For proration or adjustment line items
  if (item.proration) {
    return 'Plan Adjustment';
  }

  const subscription = subscriptions.find(
    (sub) => sub.id === item.subscription
  );
  if (subscription) {
    return `${displayNames[mapSubscriptionToTier(subscription)]} Plan`;
  }

  return item.description ?? 'Unknown Item';
}

function calculateSubscriptionAmount(
  subscription: Stripe.Subscription | undefined,
  position: 'current' | 'projected'
): number {
  if (!subscription) {
    return 0;
  }

  if (position === 'projected' && subscription.cancel_at_period_end) {
    return 0;
  }

  // For current billing, Stripe has already calculated the total with discounts and tax
  return (
    subscription.items.data.reduce((total, item) => {
      return total + (item.price?.unit_amount ?? 0) * (item.quantity ?? 1);
    }, 0) / 100
  );
}

function generateLineItemsFromSubscription(
  subscription: Stripe.Subscription | undefined
): BillingLineItemDto[] {
  if (!subscription) {
    return [];
  }

  const tier = mapSubscriptionToTier(subscription);
  const displayName = displayNames[tier];

  return subscription.items.data.map((item) => ({
    name: `${displayName} Plan`,
    quantity: item.quantity ?? 1,
    unitPrice: (item.price?.unit_amount ?? 0) / 100,
    currency: item.price?.currency || DEFAULT_CURRENCY,
    totalPrice: ((item.price?.unit_amount ?? 0) * (item.quantity ?? 1)) / 100,
    subscriptionId: subscription.id,
    status: subscription.cancel_at_period_end ? 'canceled' : 'active'
  }));
}

async function getBillingDetails(): Promise<BillingDetailsDto> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    redirect(getLoginRedirect());
  }

  const organization = await prisma.organization.findFirst({
    where: { id: session.user.organizationId },
    select: {
      stripeCustomerId: true,
      _count: { select: { users: true } }
    }
  });

  if (!organization) {
    throw new NotFoundError('Organization not found');
  }

  if (!organization.stripeCustomerId) {
    throw new PreConditionError('Stripe customer ID is missing');
  }

  try {
    const [customer, upcomingInvoice, invoices] = await Promise.all([
      stripeServer.customers.retrieve(organization.stripeCustomerId, {
        expand: ['subscriptions']
      }),
      stripeServer.invoices
        .retrieveUpcoming({
          customer: organization.stripeCustomerId,
          expand: ['total_tax_amounts']
        })
        .catch((error) => {
          // Only suppress 404s (no upcoming invoice)
          if (error.code === 'invoice_upcoming_none') {
            return null;
          }
          throw error;
        }),
      stripeServer.invoices.list({
        customer: organization.stripeCustomerId,
        expand: ['data.total_tax_amounts']
      })
    ]);

    if ('deleted' in customer) {
      throw new PreConditionError('Customer has been deleted');
    }

    const subscriptions = customer.subscriptions?.data ?? [];
    const subscription = pickSubscription(subscriptions);

    const currentPeriodInvoices = invoices.data.filter((invoice) =>
      subscription?.current_period_start
        ? invoice.period_end >= subscription.current_period_start
        : false
    );
    const totalCurrentAmount =
      currentPeriodInvoices.length > 0
        ? currentPeriodInvoices.reduce(
            (total, invoice) => total + invoice.amount_paid,
            0
          ) / 100
        : calculateSubscriptionAmount(subscription, 'current');
    const totalProjectedAmount = upcomingInvoice
      ? upcomingInvoice.total / 100
      : calculateSubscriptionAmount(subscription, 'projected');

    const response: BillingDetailsDto = {
      plan: {
        displayName: displayNames[mapSubscriptionToTier(subscription)],
        isCanceled: subscription?.cancel_at_period_end ?? false,
        stripeCurrentPeriodStart: subscription?.current_period_start,
        stripeCurrentPeriodEnd: subscription?.current_period_end
      },
      breakdown: {
        lineItems: upcomingInvoice
          ? upcomingInvoice.lines.data.map((item) => ({
              name: getTierNameFromLineItem(item, subscriptions),
              quantity: item.quantity ?? 1,
              unitPrice: (item.price?.unit_amount ?? 0) / 100,
              currency: item.currency,
              // Don't use Math.abs - preserve negative amounts for credits
              totalPrice: (item.amount ?? 0) / 100,
              subscriptionId: item.subscription as string,
              status: item.period?.end ? 'upcoming' : 'active'
            }))
          : generateLineItemsFromSubscription(subscription),
        taxes:
          upcomingInvoice?.total_tax_amounts?.map((tax) => ({
            amount: tax.amount / 100,
            taxRateId: tax.tax_rate as string
          })) ?? [],
        currency:
          upcomingInvoice?.currency ??
          subscription?.items.data[0]?.price?.currency ??
          DEFAULT_CURRENCY,
        totalCurrentAmount,
        totalProjectedAmount
      },
      email: customer.email ?? undefined,
      address: {
        line1: customer.address?.line1 ?? undefined,
        line2: customer.address?.line2 ?? undefined,
        city: customer.address?.city ?? undefined,
        state: customer.address?.state ?? undefined,
        postalCode: customer.address?.postal_code ?? undefined,
        country: customer.address?.country ?? undefined
      },
      invoices: invoices.data.map((invoice) => ({
        id: invoice.id,
        number: invoice.number,
        invoicePdfUrl: invoice.invoice_pdf,
        date: invoice.created,
        amount: invoice.total / 100,
        currency: invoice.currency || DEFAULT_CURRENCY,
        status: invoice.status,
        taxes:
          invoice.total_tax_amounts?.map((tax) => ({
            amount: tax.amount / 100,
            taxRateId: tax.tax_rate
          })) ?? []
      }))
    };

    return response;
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      throw new GatewayError(
        `Failed to retrieve billing details: ${error.message}`
      );
    }
    throw error;
  }
}

export const getDedupedBillingDetails = cache(getBillingDetails);
