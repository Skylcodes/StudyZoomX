import * as React from 'react';
import { type Metadata } from 'next';
import { InfoIcon } from 'lucide-react';

import { AddContactButton } from '@/components/dashboard/contacts/add-contact-button';
import { ContactsDataTable } from '@/components/dashboard/contacts/contacts-data-table';
import { ContactsEmptyState } from '@/components/dashboard/contacts/contacts-empty-state';
import { ContactsFilters } from '@/components/dashboard/contacts/contacts-filters';
import { searchParamsCache } from '@/components/dashboard/contacts/contacts-search-params';
import {
  Page,
  PageActions,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageSecondaryBar,
  PageTitle
} from '@/components/ui/page';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { getContactTags } from '@/data/contacts/get-contact-tags';
import { getContacts } from '@/data/contacts/get-contacts';
import { TransitionProvider } from '@/hooks/use-transition-context';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const metadata: Metadata = {
  title: createTitle('Contacts')
};

export default async function ContactsPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

  const [{ contacts, filteredCount, totalCount }, tags] = await Promise.all([
    getContacts(parsedSearchParams),
    getContactTags()
  ]);

  const hasAnyContacts = totalCount > 0;

  return (
    <TransitionProvider>
      <Page>
        <PageHeader>
          <PagePrimaryBar>
            <div className="flex flex-row items-center gap-1">
              <PageTitle>Contacts</PageTitle>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <InfoIcon className="hidden size-3 shrink-0 text-muted-foreground sm:inline" />
                </TooltipTrigger>
                <TooltipContent>
                  Total {totalCount} {totalCount === 1 ? 'contact' : 'contacts'}{' '}
                  in your organization
                </TooltipContent>
              </Tooltip>
            </div>
            {hasAnyContacts && (
              <PageActions>
                <AddContactButton />
              </PageActions>
            )}
          </PagePrimaryBar>
          <PageSecondaryBar>
            <React.Suspense>
              <ContactsFilters tags={tags} />
            </React.Suspense>
          </PageSecondaryBar>
        </PageHeader>
        <PageBody disableScroll={hasAnyContacts}>
          {hasAnyContacts ? (
            <React.Suspense>
              <ContactsDataTable
                data={contacts}
                totalCount={filteredCount}
              />
            </React.Suspense>
          ) : (
            <ContactsEmptyState />
          )}
        </PageBody>
      </Page>
    </TransitionProvider>
  );
}
