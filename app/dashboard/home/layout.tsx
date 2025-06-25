import * as React from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { InfoIcon } from 'lucide-react';

import { HomeFilters } from '@/components/dashboard/home/home-filters';
import { HomeSpinner } from '@/components/dashboard/home/home-spinner';
import { XIcon } from '@/components/ui/brand-icons';
import { buttonVariants } from '@/components/ui/button';
import {
  Page,
  PageActions,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageSecondaryBar,
  PageTitle
} from '@/components/ui/page';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { TransitionProvider } from '@/hooks/use-transition-context';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Home')
};

export type HomeLayoutProps = {
  leadGeneration: React.ReactNode;
  mostVisitedContacts: React.ReactNode;
  leastVisitedContacts: React.ReactNode;
};

export default function HomeLayout({
  leadGeneration,
  mostVisitedContacts,
  leastVisitedContacts
}: HomeLayoutProps): React.JSX.Element {
  return (
    <TransitionProvider>
      <Page>
        <PageHeader>
          <PagePrimaryBar>
            <div className="flex flex-row items-center gap-1">
              <PageTitle>Overview</PageTitle>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <InfoIcon className="hidden size-3 shrink-0 text-muted-foreground sm:inline" />
                </TooltipTrigger>
                <TooltipContent>
                  Lead and contact engagement metrics
                </TooltipContent>
              </Tooltip>
            </div>
            <PageActions>
              <Link
                href="https://github.com/achromaticlabs/pro"
                target="_blank"
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <GitHubLogoIcon className="size-4 shrink-0" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://x.com/achromaticlabs"
                target="_blank"
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <XIcon className="size-4 shrink-0" />
                <span className="sr-only">X (formerly Twitter)</span>
              </Link>
            </PageActions>
          </PagePrimaryBar>
          <PageSecondaryBar>
            <HomeFilters />
          </PageSecondaryBar>
        </PageHeader>
        <PageBody>
          <div className="mx-auto max-w-6xl space-y-2 p-2 sm:space-y-8 sm:p-6">
            {leadGeneration}
            <div className="grid grid-cols-1 gap-2 sm:gap-8 md:grid-cols-2">
              {mostVisitedContacts}
              {leastVisitedContacts}
            </div>
          </div>
          <HomeSpinner />
        </PageBody>
      </Page>
    </TransitionProvider>
  );
}
