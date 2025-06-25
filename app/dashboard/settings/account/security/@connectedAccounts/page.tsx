import * as React from 'react';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

import { ConnectedAccountsCard } from '@/components/dashboard/settings/account/security/connected-accounts-card';
import { getConnectedAccounts } from '@/data/account/get-connected-accounts';
import { AuthErrorCode, authErrorMessages } from '@/lib/auth/errors';
import type { NextPageProps } from '@/types/next-page-props';

const searchParamsCache = createSearchParamsCache({
  error: parseAsString.withDefault('')
});

export default async function ConnectedAccountsPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const connectedAccounts = await getConnectedAccounts();
  const { error } = await searchParamsCache.parse(searchParams);

  const errorMessage = error
    ? error in authErrorMessages
      ? authErrorMessages[error as AuthErrorCode]
      : authErrorMessages[AuthErrorCode.UnknownError]
    : '';

  return (
    <ConnectedAccountsCard
      connectedAccounts={connectedAccounts}
      errorMessage={errorMessage}
    />
  );
}
