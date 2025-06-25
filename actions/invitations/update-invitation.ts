'use server';

import { revalidateTag } from 'next/cache';
import { Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { isAdmin } from '@/lib/auth/permissions';
import { prisma } from '@/lib/db/prisma';
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { updateInvitationSchema } from '@/schemas/invitations/update-invitation-schema';

export const updateInvitation = authActionClient
  .metadata({ actionName: 'updateInvitation' })
  .schema(updateInvitationSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const invitation = await prisma.invitation.findFirst({
      where: {
        id: parsedInput.id,
        organizationId: session.user.organizationId
      },
      select: {
        email: true,
        role: true
      }
    });
    if (!invitation) {
      throw new NotFoundError('Invitation not found');
    }
    if (
      invitation.role !== Role.ADMIN &&
      parsedInput.role === Role.ADMIN &&
      !(await isAdmin(session.user.id))
    ) {
      throw new ForbiddenError('Insufficient permissions');
    }

    await prisma.invitation.update({
      where: { id: parsedInput.id },
      data: { role: parsedInput.role },
      select: {
        id: true // SELECT NONE
      }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Invitations,
        session.user.organizationId
      )
    );
  });
