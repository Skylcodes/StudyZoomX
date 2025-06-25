import * as React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getPathname } from '@/lib/network/get-pathname';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Auth')
};

function isChangeEmailRoute(): boolean {
  const pathname = getPathname();
  return !!pathname && pathname.startsWith(Routes.ChangeEmail);
}

export default async function AuthLayout({
  children
}: React.PropsWithChildren): Promise<React.JSX.Element> {
  const session = await dedupedAuth();
  if (!isChangeEmailRoute() && session) {
    return redirect(Routes.Home);
  }
  return (
    <div className="py-8">
      <main className="flex flex-col items-center justify-center p-2">
        {children}
      </main>
      <ThemeToggle className="fixed bottom-2 right-2 rounded-full" />
    </div>
  );
}
