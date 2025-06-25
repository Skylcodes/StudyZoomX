import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  UserCacheKey
} from '@/data/caching';
import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';

type Organization = {
  name: string;
  completedOnboarding: boolean;
};

type User = {
  name: string;
  email?: string;
  image?: string;
  completedOnboarding: boolean;
};

type OnboardingData = {
  organization: Organization;
  user: User;
};

export async function getOnboardingData(): Promise<OnboardingData> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  return cache(
    async () => {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          organizationId: true,
          image: true,
          name: true,
          email: true,
          completedOnboarding: true
        }
      });
      if (!user) {
        throw new NotFoundError('User not found');
      }

      const organization = await prisma.organization.findFirst({
        where: { id: session.user.organizationId },
        select: {
          name: true,
          completedOnboarding: true
        }
      });
      if (!organization) {
        throw new NotFoundError('Organization not found');
      }

      return {
        organization: {
          name: organization.name,
          completedOnboarding: organization.completedOnboarding
        },
        user: {
          name: user.name,
          email: user.email ?? undefined,
          image: user.image ?? undefined,
          completedOnboarding: user.completedOnboarding
        }
      };
    },
    Caching.createUserKeyParts(UserCacheKey.OnboardingData, session.user.id),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createUserTag(UserCacheKey.OnboardingData, session.user.id)
      ]
    }
  )();
}
