import * as React from 'react';

import { LeastVisitedContactsSkeletonCard } from '@/components/dashboard/home/least-visited-contacts-skeleton-card';

export default function LeastVisitedContactsLoading(): React.JSX.Element {
  return (
    <LeastVisitedContactsSkeletonCard className="col-span-2 md:col-span-1" />
  );
}
