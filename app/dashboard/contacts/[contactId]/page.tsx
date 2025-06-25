import * as React from 'react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

import { ContactActions } from '@/components/dashboard/contacts/details/contact-actions';
import { ContactMeta } from '@/components/dashboard/contacts/details/contact-meta';
import { ContactPageVisit } from '@/components/dashboard/contacts/details/contact-page-visit';
import { ContactTabs } from '@/components/dashboard/contacts/details/contact-tabs';
import {
  Page,
  PageBack,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { getContact } from '@/data/contacts/get-contact';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

const paramsCache = createSearchParamsCache({
  contactId: parseAsString.withDefault('')
});

export async function generateMetadata({
  params
}: NextPageProps): Promise<Metadata> {
  const { contactId } = await paramsCache.parse(params);

  if (contactId) {
    const contact = await getContact({ id: contactId });
    if (contact) {
      return {
        title: createTitle(contact.name)
      };
    }
  }

  return {
    title: createTitle('Contact')
  };
}

export default async function ContactPage({
  params
}: NextPageProps): Promise<React.JSX.Element> {
  const { contactId } = await paramsCache.parse(params);
  if (!contactId) {
    return notFound();
  }

  const contact = await getContact({ id: contactId });

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <div className="flex flex-row items-center gap-4">
            <PageBack href={Routes.Contacts} />
            <PageTitle>{contact.name}</PageTitle>
          </div>
          <ContactActions contact={contact} />
        </PagePrimaryBar>
      </PageHeader>
      <PageBody
        disableScroll
        className="flex h-full flex-col overflow-auto md:flex-row md:divide-x md:overflow-hidden"
      >
        <ContactPageVisit contact={contact} />
        <ContactMeta contact={contact} />
        <ContactTabs contact={contact} />
      </PageBody>
    </Page>
  );
}
