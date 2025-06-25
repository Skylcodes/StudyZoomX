'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { ConnectedAccountList } from '@/components/dashboard/settings/account/security/connected-account-list';
import { Card, CardContent, type CardProps } from '@/components/ui/card';
import { EmptyText } from '@/components/ui/empty-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { ConnectedAccountDto } from '@/types/dtos/connected-account-dto';

export type ConnectedAccountsCardProps = CardProps & {
  connectedAccounts: ConnectedAccountDto[];
  errorMessage: string;
};

export function ConnectedAccountsCard({
  connectedAccounts,
  errorMessage,
  className,
  ...other
}: ConnectedAccountsCardProps): React.JSX.Element {
  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);
  return (
    <Card
      className={cn('flex h-full flex-col', className)}
      {...other}
    >
      <CardContent className="max-h-72 flex-1 overflow-hidden p-0">
        {connectedAccounts.length > 0 ? (
          <ScrollArea className="h-full">
            <ConnectedAccountList connectedAccounts={connectedAccounts} />
          </ScrollArea>
        ) : (
          <EmptyText className="p-6">No connected account found.</EmptyText>
        )}
      </CardContent>
    </Card>
  );
}
