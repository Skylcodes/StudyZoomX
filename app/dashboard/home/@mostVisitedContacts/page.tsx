import * as React from 'react';

import { searchParamsCache } from '@/components/dashboard/home/home-search-params';
import { MostVisitedContactsCard } from '@/components/dashboard/home/most-visited-contacts-card';
import { getMostVisitedContacts } from '@/data/home/get-most-visited-contacts';
import type { NextPageProps } from '@/types/next-page-props';

export default async function MostVisitedContactsPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);
  const contacts = await getMostVisitedContacts(parsedSearchParams);

  return (
    <MostVisitedContactsCard
      contacts={contacts}
      className="col-span-2 md:col-span-1"
    />
  );
}
