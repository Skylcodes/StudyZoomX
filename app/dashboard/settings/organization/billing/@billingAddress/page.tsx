import * as React from 'react';

import { BillingAddressCard } from '@/components/dashboard/settings/organization/billing/billing-address-card';
import { getDedupedBillingDetails } from '@/data/billing/get-billing-details';

export default async function BillingAddressPage(): Promise<React.JSX.Element> {
  const details = await getDedupedBillingDetails();
  return <BillingAddressCard address={details.address} />;
}
