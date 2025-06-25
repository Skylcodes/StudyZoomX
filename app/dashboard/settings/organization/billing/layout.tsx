import * as React from 'react';
import { type Metadata } from 'next';

import { AnnotatedLayout } from '@/components/ui/annotated';
import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Separator } from '@/components/ui/separator';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Billing')
};

export type BillingLayoutProps = {
  subscriptionPlan: React.ReactNode;
  billingBreakdown: React.ReactNode;
  billingEmail: React.ReactNode;
  billingAddress: React.ReactNode;
  invoices: React.ReactNode;
};

export default function BillingLayout({
  subscriptionPlan,
  billingBreakdown,
  billingEmail,
  billingAddress,
  invoices
}: BillingLayoutProps): React.JSX.Element {
  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Billing</PageTitle>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <AnnotatedLayout>
          {subscriptionPlan}
          <Separator />
          {billingBreakdown}
          <Separator />
          {billingEmail}
          <Separator />
          {billingAddress}
          <Separator />
          {invoices}
        </AnnotatedLayout>
      </PageBody>
    </Page>
  );
}
