import * as React from 'react';
import { type Metadata } from 'next';

import { AuthContainer } from '@/components/auth/auth-container';
import { InvitationAlreadyAcceptedCard } from '@/components/invitations/invitation-already-accepted-card';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Already accepted')
};

export default function InvitationAlreadyAcceptedPage(): React.JSX.Element {
  return (
    <AuthContainer maxWidth="sm">
      <InvitationAlreadyAcceptedCard />
    </AuthContainer>
  );
}
