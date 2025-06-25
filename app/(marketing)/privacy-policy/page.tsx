import * as React from 'react';
import type { Metadata } from 'next';

import { PrivacyPolicy } from '@/components/marketing/sections/privacy-policy';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Privacy Policy')
};

export default function PrivacyPolicyPage(): React.JSX.Element {
  return <PrivacyPolicy />;
}
