'use server';

import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';

import { authActionClient } from '@/actions/safe-action';
import { Routes } from '@/constants/routes';
import { stripeServer } from '@/lib/billing/stripe-server';
import { prisma } from '@/lib/db/prisma';
import { GatewayError, NotFoundError } from '@/lib/validation/exceptions';
import { updateBillingAddressSchema } from '@/schemas/billing/update-billing-address-schema';

export const updateBillingAddress = authActionClient
  .metadata({ actionName: 'updateBillingAddress' })
  .schema(updateBillingAddressSchema)
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
        address: {
          line1: parsedInput.line1,
          line2: parsedInput.line2,
          country: parsedInput.country,
          postal_code: parsedInput.postalCode,
          city: parsedInput.city,
          state: parsedInput.state
        }
      });

      revalidatePath(Routes.Billing);
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) {
        throw new GatewayError(
          `Failed to update billing address: ${error.message}`
        );
      }
      throw error;
    }
  });
