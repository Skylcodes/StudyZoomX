import * as React from 'react';
import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';
import { Routes } from '@/constants/routes';

export function InvitationAlreadyAcceptedCard(
  props: CardProps
): React.JSX.Element {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Invitation was already accepted</CardTitle>
        <CardDescription>
          If you feel you've reached this message in error, please talk with
          your team administrator and ask them to reinvite you. In case you have
          an account you can try to{' '}
          <Link
            href={Routes.Login}
            className="text-foreground underline"
          >
            log in
          </Link>{' '}
          instead.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
