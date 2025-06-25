'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { NextButton } from '@/components/onboarding/next-button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { type CompleteOrganizationOnboardingSchema } from '@/schemas/onboarding/complete-organization-onboarding-schema';

export type OnboardingOrganizationStepProps =
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    canSubmit: boolean;
    loading: boolean;
    isLastStep: boolean;
  };

export function OnboardingOrganizationStep({
  canSubmit,
  loading,
  isLastStep,
  className,
  ...other
}: OnboardingOrganizationStepProps): React.JSX.Element {
  const methods = useFormContext<CompleteOrganizationOnboardingSchema>();
  return (
    <div
      className={cn('flex w-full flex-col gap-4', className)}
      {...other}
    >
      <FormField
        control={methods.control}
        name="organizationName"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel required>Organization name</FormLabel>
            <FormControl>
              <Input
                type="text"
                maxLength={70}
                required
                disabled={loading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <NextButton
        loading={loading}
        disabled={!canSubmit}
        isLastStep={isLastStep}
      />
    </div>
  );
}
