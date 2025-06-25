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
  title: createTitle('Members')
};

export type MembersLayoutProps = {
  team: React.ReactNode;
  invitations: React.ReactNode;
};

export default function MembersLayout({
  team,
  invitations
}: MembersLayoutProps): React.JSX.Element {
  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Members</PageTitle>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <AnnotatedLayout>
          {team}
          <Separator />
          {invitations}
        </AnnotatedLayout>
      </PageBody>
    </Page>
  );
}
