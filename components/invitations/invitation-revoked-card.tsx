import * as React from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';

export function InvitationRevokedCard(props: CardProps): React.JSX.Element {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Invitation was revoked</CardTitle>
        <CardDescription>
          If you feel you've reached this message in error, please talk with
          your team administrator and ask them to reinvite you.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
