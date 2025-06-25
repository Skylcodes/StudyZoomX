import * as React from 'react';

import { AnnotatedSection } from '@/components/ui/annotated';
import { AppInfo } from '@/constants/app-info';

export default function SubscriptionPlanLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <AnnotatedSection
      title="Subscription plan"
      description={`View, upgrade or cancel your subscription. We partner with Stripe to handle billings for ${AppInfo.APP_NAME}.`}
    >
      {children}
    </AnnotatedSection>
  );
}
