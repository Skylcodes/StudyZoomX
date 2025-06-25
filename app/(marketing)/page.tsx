import * as React from 'react';

import { EnterpriseFeatures } from '@/components/marketing/sections/enterprise-features';
import { FAQ } from '@/components/marketing/sections/faq';
import Hero from '@/components/marketing/sections/hero-new';
import { Reviews } from '@/components/marketing/sections/reviews';
import Features from '@/components/marketing/sections/features';
import { FeatureComparison } from '@/components/marketing/sections/feature-comparison';
import { PricingUI } from '@/components/marketing/sections/pricing-ui';

export default function IndexPage(): React.JSX.Element {
  return (
    <main className="flex flex-col">
      <Hero />
      <EnterpriseFeatures />
      <Features />
      <FeatureComparison />
      <Reviews />
      <PricingUI />
      <FAQ />
    </main>
  );
}
