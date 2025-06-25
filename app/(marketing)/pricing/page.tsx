import * as React from 'react';
import type { Metadata } from 'next';

import { PricingFAQ } from '@/components/marketing/sections/pricing-faq';
import { PricingPlans } from '@/components/marketing/sections/pricing-plans';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Pricing')
};

export default function PricingPage(): React.JSX.Element {
  return (
    <>
      <PricingPlans />
      <PricingFAQ />
    </>
  );
}
