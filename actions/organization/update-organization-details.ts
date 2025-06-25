'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { stripeServer } from '@/lib/billing/stripe-server';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { updateOrganizationDetailsSchema } from '@/schemas/organization/update-organization-details-schema';

export const updateOrganizationDetails = authActionClient
  .metadata({ actionName: 'updateOrganizationDetails' })
  .schema(updateOrganizationDetailsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const organization = await prisma.organization.findFirst({
      where: { id: session.user.organizationId },
      select: {
        name: true,
        stripeCustomerId: true
      }
    });
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }

    await prisma.organization.update({
      where: { id: session.user.organizationId },
      data: {
        name: parsedInput.name,
        address: parsedInput.address,
        phone: parsedInput.phone,
        email: parsedInput.email,
        website: parsedInput.website
      },
      select: {
        id: true // SELECT NONE
      }
    });

    if (organization.name !== organization.name) {
      if (organization.stripeCustomerId) {
        try {
          await stripeServer.customers.update(organization.stripeCustomerId, {
            name: parsedInput.name
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        console.warn('Stripe customer ID is missing');
      }
    }

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.OrganizationDetails,
        session.user.organizationId
      )
    );
  });
