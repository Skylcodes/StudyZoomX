import * as React from 'react';
import type { Metadata } from 'next';

import { CookiePolicy } from '@/components/marketing/sections/cookie-policy';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Cookie Policy')
};

export default function CookiePolicyPage(): React.JSX.Element {
  return <CookiePolicy />;
}
