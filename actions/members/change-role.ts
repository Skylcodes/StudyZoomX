'use server';

import { revalidateTag } from 'next/cache';
import { Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey, UserCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { changeRoleSchema } from '@/schemas/members/change-role-schema';

export const changeRole = authActionClient
  .metadata({ actionName: 'changeRole' })
  .schema(changeRoleSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    if (parsedInput.role !== Role.ADMIN) {
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

    const count = await prisma.user.count({
      where: {
        organizationId: session.user.organizationId,
        id: parsedInput.id
      }
    });
    if (count < 1) {
      throw new NotFoundError('Member not found.');
    }

    await prisma.user.update({
      where: { id: parsedInput.id },
      data: {
        role: parsedInput.role
      },
      select: {
        id: true // SELECT NONE
      }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Members,
        session.user.organizationId
      )
    );
    revalidateTag(
      Caching.createUserTag(UserCacheKey.PersonalDetails, parsedInput.id)
    );
  });
