'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { Role } from '@prisma/client';
import { MoreHorizontalIcon } from 'lucide-react';

import { ChangeRoleModal } from '@/components/dashboard/settings/organization/members/change-role-modal';
import { RemoveMemberModal } from '@/components/dashboard/settings/organization/members/remove-member-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { capitalize, cn, getInitials } from '@/lib/utils';
import type { MemberDto } from '@/types/dtos/member-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export type MemberListProps = React.HtmlHTMLAttributes<HTMLUListElement> & {
  profile: ProfileDto;
  members: MemberDto[];
};

export function MemberList({
  profile,
  members,
  className,
  ...other
}: MemberListProps): React.JSX.Element {
  return (
    <ul
      role="list"
      className={cn('m-0 list-none divide-y p-0', className)}
      {...other}
    >
      {members.map((member) => (
        <MemberListItem
          key={member.id}
          profile={profile}
          member={member}
        />
      ))}
    </ul>
  );
}

type MemberListItemProps = React.HtmlHTMLAttributes<HTMLLIElement> & {
  profile: ProfileDto;
  member: MemberDto;
};

function MemberListItem({
  profile,
  member,
  className,
  ...other
}: MemberListItemProps): React.JSX.Element {
  const handleShowChangeRoleModal = (): void => {
    NiceModal.show(ChangeRoleModal, { profile, member });
  };
  const handleShowRemoveMemberModal = (): void => {
    NiceModal.show(RemoveMemberModal, { member });
  };
  return (
    <li
      role="listitem"
      className={cn('flex w-full flex-row justify-between p-6', className)}
      {...other}
    >
      <div className="flex flex-row items-center gap-4">
        <Avatar className="size-8">
          <AvatarImage
            src={member.image}
            alt={member.name}
          />
          <AvatarFallback className="rounded-full transition-colors duration-200 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="text-sm font-medium">{member.name}</div>
          <div className="text-xs font-normal text-muted-foreground">
            {member.email}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Badge
          variant="secondary"
          className="hidden rounded-3xl sm:inline-block"
        >
          {capitalize(member.role.toLowerCase())}
        </Badge>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="size-8 p-0"
              title="Open menu"
            >
              <MoreHorizontalIcon className="size-4 shrink-0" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShowChangeRoleModal}>
              Change role
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="!text-destructive"
              onClick={handleShowRemoveMemberModal}
              disabled={profile.role === Role.MEMBER}
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
