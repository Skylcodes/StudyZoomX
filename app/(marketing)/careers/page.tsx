import * as React from 'react';
import type { Metadata } from 'next';

import { CareersBenefits } from '@/components/marketing/sections/careers-benefits';
import { CareersPositions } from '@/components/marketing/sections/careers-positions';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Careers')
};

export default function CareersPage(): React.JSX.Element {
  return (
    <>
      <CareersBenefits />
      <CareersPositions />
    </>
  );
}
