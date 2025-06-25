import * as React from 'react';
import { type Metadata } from 'next';

import { AuthContainer } from '@/components/auth/auth-container';
import { InvitationRevokedCard } from '@/components/invitations/invitation-revoked-card';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Invitation revoked')
};

export default function InvitationRevokedPage(): React.JSX.Element {
  return (
    <AuthContainer maxWidth="sm">
      <InvitationRevokedCard />;
    </AuthContainer>
  );
}
