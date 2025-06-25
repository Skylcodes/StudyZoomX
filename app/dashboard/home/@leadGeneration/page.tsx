import * as React from 'react';

import { searchParamsCache } from '@/components/dashboard/home/home-search-params';
import { LeadGenerationCard } from '@/components/dashboard/home/lead-generation-card';
import { getLeadGenerationData } from '@/data/home/get-lead-generation-data';
import type { NextPageProps } from '@/types/next-page-props';

export default async function LeadGenerationPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);
  const data = await getLeadGenerationData(parsedSearchParams);

  return <LeadGenerationCard data={data} />;
}
