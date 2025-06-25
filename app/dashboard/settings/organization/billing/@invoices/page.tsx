import * as React from 'react';

import { InvoicesCard } from '@/components/dashboard/settings/organization/billing/invoices-card';
import { getDedupedBillingDetails } from '@/data/billing/get-billing-details';

export default async function InvoicesPage(): Promise<React.JSX.Element> {
  const details = await getDedupedBillingDetails();
  return <InvoicesCard invoices={details.invoices} />;
}
