'use client';

import * as React from 'react';
import { ChevronLeftIcon } from 'lucide-react';
import { toast } from 'sonner';

import { logOut } from '@/actions/auth/log-out';
import { Button, type ButtonProps } from '@/components/ui/button';

export function LogOutButton(props: ButtonProps): React.JSX.Element {
  const handleLogOut = async (): Promise<void> => {
    const result = await logOut({ redirect: true });
    if (result?.serverError || result?.validationErrors) {
      toast.error("Couldn't log out");
    }
  };
  return (
    <Button
      type="button"
      variant="link"
      onClick={handleLogOut}
      {...props}
    >
      <ChevronLeftIcon className="mr-2 size-4 shrink-0" />
      Log out
    </Button>
  );
}
