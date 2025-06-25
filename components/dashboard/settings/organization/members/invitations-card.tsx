'use client';

import * as React from 'react';
import { InvitationStatus } from '@prisma/client';

import { InvitationList } from '@/components/dashboard/settings/organization/members/invitation-list';
import {
  Card,
  CardContent,
  CardHeader,
  type CardProps
} from '@/components/ui/card';
import { EmptyText } from '@/components/ui/empty-text';
import { InputSearch } from '@/components/ui/input-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { InvitationDto } from '@/types/dtos/invitation-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export type InvitationsCardProps = CardProps & {
  profile: ProfileDto;
  invitations: InvitationDto[];
};

export function InvitationsCard({
  profile,
  invitations,
  className,
  ...other
}: InvitationsCardProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>(InvitationStatus.PENDING);
  const filteredInvitations = invitations
    .filter((invitation) => invitation.status === status)
    .filter(
      (invitation) =>
        !searchQuery ||
        invitation.email.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
  const handleSearchQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(e.target?.value || '');
  };
  return (
    <Card
      className={cn('flex h-full flex-col', className)}
      {...other}
    >
      <CardHeader className="pb-0">
        <div className="flex flex-row items-center gap-2">
          <InputSearch
            placeholder="Filter by email"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <Tabs
            value={status}
            onValueChange={setStatus}
          >
            <TabsList>
              <TabsTrigger value={InvitationStatus.PENDING}>
                Pending
              </TabsTrigger>
              <TabsTrigger value={InvitationStatus.REVOKED}>
                Revoked
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="max-h-72 flex-1 overflow-hidden p-0">
        {filteredInvitations.length > 0 ? (
          <ScrollArea className="h-full">
            <InvitationList
              profile={profile}
              invitations={invitations}
            />
          </ScrollArea>
        ) : (
          <EmptyText className="p-6">
            No {status.toLowerCase()} invitation found
            {!!searchQuery && ' (filtered)'}.
          </EmptyText>
        )}
      </CardContent>
    </Card>
  );
}
