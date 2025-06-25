'use server';

import Stripe from 'stripe';

import { authActionClient } from '@/actions/safe-action';
import { Routes } from '@/constants/routes';
import { stripeServer } from '@/lib/billing/stripe-server';
import { prisma } from '@/lib/db/prisma';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { GatewayError, NotFoundError } from '@/lib/validation/exceptions';

export const createBillingPortalSessionUrl = authActionClient
  .metadata({ actionName: 'createBillingPortalSessionUrl' })
  .action(async ({ ctx: { session } }) => {
    const organization = await prisma.organization.findFirst({
      where: { id: session.user.organizationId },
      select: { stripeCustomerId: true }
    });
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }
    if (!organization.stripeCustomerId) {
      throw new NotFoundError('Stripe customer not found');
    }

    try {
      const billingPortalSession: Stripe.BillingPortal.Session =
        await stripeServer.billingPortal.sessions.create({
          customer: organization.stripeCustomerId,
          return_url: `${getBaseUrl()}${Routes.Billing}`
        });

      return { url: billingPortalSession.url };
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) {
        throw new GatewayError(
          `Failed to update billing address: ${error.message}`
        );
      }
      throw error;
    }
  });
