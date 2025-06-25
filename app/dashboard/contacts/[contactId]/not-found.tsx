'use client';

import * as React from 'react';
import { Metadata } from 'next';
import { MoreHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EmptyText } from '@/components/ui/empty-text';
import {
  Page,
  PageActions,
  PageBack,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { createTitle } from '@/lib/utils';

function getLastPartOfUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

export const metadata: Metadata = {
  title: createTitle('Contact not found')
};

export default function ContactNotFoundPage(): React.JSX.Element {
  const copyToClipboard = useCopyToClipboard();
  const handleCopyContactId = async (): Promise<void> => {
    await copyToClipboard(getLastPartOfUrl(window.location.href));
    toast.success('Copied!');
  };
  const handleCopyPageUrl = async (): Promise<void> => {
    await copyToClipboard(window.location.href);
    toast.success('Copied!');
  };
  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <div className="flex flex-row items-center gap-4">
            <PageBack href={Routes.Contacts} />
            <PageTitle>Not found</PageTitle>
          </div>
          <PageActions>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="size-9"
                  title="Open menu"
                >
                  <MoreHorizontalIcon className="size-4 shrink-0" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyContactId}>
                  Copy contact ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyPageUrl}>
                  Copy page URL
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PageActions>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <EmptyText className="p-6">Contact was not found.</EmptyText>
      </PageBody>
    </Page>
  );
}
