'use server';

import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';

import { authActionClient } from '@/actions/safe-action';
import { Routes } from '@/constants/routes';
import { stripeServer } from '@/lib/billing/stripe-server';
import { prisma } from '@/lib/db/prisma';
import { GatewayError, NotFoundError } from '@/lib/validation/exceptions';
import { updateBillingEmailSchema } from '@/schemas/billing/update-billing-email-schema';

export const updateBillingEmail = authActionClient
  .metadata({ actionName: 'updateBillingEmail' })
  .schema(updateBillingEmailSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
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
      await stripeServer.customers.update(organization.stripeCustomerId, {
        email: parsedInput.email
      });
      revalidatePath(Routes.Billing);
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) {
        throw new GatewayError(
          `Failed to update billing email: ${error.message}`
        );
      }
      throw error;
    }
  });
