import * as React from 'react';
import type { Metadata } from 'next';

import { Contact } from '@/components/marketing/sections/contact';
import { FAQ } from '@/components/marketing/sections/faq';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Contact')
};

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <Contact />
      <FAQ />
    </>
  );
}
