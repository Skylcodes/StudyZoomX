'use client';

import * as React from 'react';
import type { InvitationStatus, Role } from '@prisma/client';
import { AlertCircleIcon } from 'lucide-react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { join } from '@/actions/auth/join';
import { PasswordRequirementList } from '@/components/auth/password-requirement-list';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  joinSchema,
  type JoinOrganizationSchema
} from '@/schemas/auth/join-schema';

type Invitation = {
  id: string;
  email: string;
  role: Role;
  status: InvitationStatus;
};

export type JoinOrganizationCardProps = CardProps & {
  invitation: Invitation;
  organizationName: string;
};

export function JoinOrganizationCard({
  invitation,
  organizationName,
  ...other
}: JoinOrganizationCardProps): React.JSX.Element {
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const methods = useZodForm({
    schema: joinSchema,
    mode: 'onSubmit',
    defaultValues: {
      invitationId: invitation?.id ?? '',
      name: '',
      email: invitation?.email ?? '',
      password: ''
    }
  });
  const canSubmit = !methods.formState.isSubmitting;
  const onSubmit: SubmitHandler<JoinOrganizationSchema> = async (values) => {
    if (!canSubmit) {
      return;
    }
    const result = await join(values);
    if (result?.serverError || result?.validationErrors) {
      toast.error("Couldn't join organization");
      setErrorMessage("Couldn't join organization");
    }
  };
  return (
    <FormProvider {...methods}>
      <Card {...other}>
        <CardHeader>
          <CardTitle>Join {organizationName}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <input
              type="hidden"
              className="hidden"
              disabled={methods.formState.isSubmitting}
              {...methods.register('invitationId')}
            />
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      maxLength={64}
                      autoComplete="name"
                      disabled={methods.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      maxLength={255}
                      autoComplete="username"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        maxLength={72}
                        autoCapitalize="off"
                        autoComplete="current-password"
                        disabled={methods.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordRequirementList password={methods.watch('password')} />
            </div>
            {errorMessage && (
              <Alert variant="destructive">
                <div className="flex flex-row items-center gap-2">
                  <AlertCircleIcon className="size-[18px] shrink-0" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </div>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            variant="default"
            className="w-full"
            disabled={!canSubmit}
            loading={methods.formState.isSubmitting}
            onClick={methods.handleSubmit(onSubmit)}
          >
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
