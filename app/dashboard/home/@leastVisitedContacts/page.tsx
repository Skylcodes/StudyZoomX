import * as React from 'react';

import { searchParamsCache } from '@/components/dashboard/home/home-search-params';
import { LeastVisitedContactsCard } from '@/components/dashboard/home/least-visited-contacts-card';
import { getLeastVisitedContacts } from '@/data/home/get-least-visited-contacts';
import type { NextPageProps } from '@/types/next-page-props';

export default async function LeastVisitedContactsPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);
  const contacts = await getLeastVisitedContacts(parsedSearchParams);

  return (
    <LeastVisitedContactsCard
      contacts={contacts}
      className="col-span-2 md:col-span-1"
    />
  );
}
