'use server';

import { revalidateTag } from 'next/cache';
import { Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { isAdmin } from '@/lib/auth/permissions';
import { updateStripeSubscriptionQuantity } from '@/lib/billing/update-stripe-subscription-quantity';
import { prisma } from '@/lib/db/prisma';
import {
  ForbiddenError,
  NotFoundError,
  PreConditionError
} from '@/lib/validation/exceptions';
import { removeMemberSchema } from '@/schemas/members/remove-member-schema';

export const removeMember = authActionClient
  .metadata({ actionName: 'removeMember' })
  .schema(removeMemberSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    if (!(await isAdmin(session.user.id))) {
      throw new ForbiddenError('Insufficient permissions');
    }

    const userFromDb = await prisma.user.findFirst({
      where: {
        organizationId: session.user.organizationId,
        id: parsedInput.id
      },
      select: {
        id: true,
        email: true,
        role: true
      }
    });

    if (!userFromDb) {
      throw new NotFoundError('Member not found');
    }

    if (!userFromDb.email) {
      throw new PreConditionError('Email is missing');
    }

    if (userFromDb.role === Role.ADMIN) {
      const ownerCount = await prisma.user.count({
        where: {
          organizationId: session.user.organizationId,
          role: Role.ADMIN
        }
      });
      if (ownerCount < 2) {
        throw new ForbiddenError('At least one admin is required.');
      }
    }

    await prisma.$transaction([
      prisma.invitation.deleteMany({
        where: { email: userFromDb.email! }
      }),
      prisma.account.deleteMany({
        where: { userId: userFromDb.id }
      }),
      prisma.session.deleteMany({
        where: { userId: userFromDb.id }
      }),
      prisma.verificationToken.deleteMany({
        where: { identifier: userFromDb.email }
      }),
      prisma.changeEmailRequest.deleteMany({
        where: { userId: userFromDb.id }
      }),
      prisma.resetPasswordRequest.deleteMany({
        where: { email: userFromDb.email }
      }),
      prisma.user.deleteMany({
        where: { id: userFromDb.id }
      })
    ]);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Members,
        session.user.organizationId
      )
    );

    try {
      await updateStripeSubscriptionQuantity(session.user.organizationId);
    } catch (e) {
      console.error(e);
    }
  });
