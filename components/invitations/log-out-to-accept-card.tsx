'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { InfoIcon } from 'lucide-react';
import { toast } from 'sonner';
import { validate as uuidValidate } from 'uuid';

import { logOut } from '@/actions/auth/log-out';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';
import { Routes } from '@/constants/routes';
import { getBaseUrl } from '@/lib/urls/get-base-url';

export type LogOutToAcceptCardProps = CardProps & {
  token?: string;
};

export function LogOutToAcceptCard({
  token,
  ...other
}: LogOutToAcceptCardProps): React.JSX.Element {
  const router = useRouter();
  const handleLogOut = async () => {
    const result = await logOut({ redirect: false });
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Logged out successfully');
      router.push(
        !!token && uuidValidate(token)
          ? `${getBaseUrl()}${Routes.InvitationRequest}/${token}`
          : Routes.Logout
      );
    } else {
      toast.error("Couldn't log out");
    }
  };
  return (
    <Card {...other}>
      <CardHeader className="text-center">
        <CardTitle>Log out to accept invitation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-2 rounded-xl bg-muted p-4">
          <div className="flex size-10 items-center justify-center rounded-full border bg-background shadow-sm">
            <InfoIcon className="size-5 text-primary" />
          </div>
          <span className="text-sm font-medium">Active session</span>
          <span className="text-center text-xs text-muted-foreground">
            To accept the invitation, you have to log out of your account. The
            link is likely intended for someone else.
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="default"
          className="w-full"
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </CardFooter>
    </Card>
  );
}
