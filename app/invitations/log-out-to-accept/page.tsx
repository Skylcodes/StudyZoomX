import * as React from 'react';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';
import { validate as uuidValidate } from 'uuid';

import { AuthContainer } from '@/components/auth/auth-container';
import { LogOutToAcceptCard } from '@/components/invitations/log-out-to-accept-card';
import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

const searchParamsCache = createSearchParamsCache({
  token: parseAsString.withDefault('')
});

export const metadata: Metadata = {
  title: createTitle('Log out to accept invitation')
};

export default async function LogOutToAcceptPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const { token } = await searchParamsCache.parse(searchParams);

  const session = await dedupedAuth();
  if (!session) {
    return redirect(
      !!token && uuidValidate(token)
        ? `${getBaseUrl()}${Routes.InvitationRequest}/${token}`
        : Routes.Root
    );
  }

  return (
    <AuthContainer maxWidth="sm">
      <LogOutToAcceptCard token={token} />
    </AuthContainer>
  );
}
