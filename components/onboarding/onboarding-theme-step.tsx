'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { useFormContext } from 'react-hook-form';

import { ThemeOption } from '@/components/dashboard/settings/account/profile/theme-option';
import { NextButton } from '@/components/onboarding/next-button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RadioCardItem, RadioCards } from '@/components/ui/radio-card';
import { cn } from '@/lib/utils';
import { type CompleteUserOnboardingSchema } from '@/schemas/onboarding/complete-user-onboarding-schema';

export type OnboardingThemeStepProps =
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    canSubmit: boolean;
    loading: boolean;
    isLastStep: boolean;
  };

export function OnboardingThemeStep({
  canSubmit,
  loading,
  isLastStep,
  className,
  ...other
}: OnboardingThemeStepProps): React.JSX.Element {
  const { setTheme } = useTheme();
  const methods = useFormContext<CompleteUserOnboardingSchema>();
  const selectedTheme = methods.watch('theme');
  React.useEffect(() => {
    setTheme(selectedTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);
  return (
    <div
      className={cn('flex w-full flex-col gap-4', className)}
      {...other}
    >
      <FormField
        control={methods.control}
        name="theme"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormControl>
              <RadioCards
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-row flex-wrap gap-4"
                disabled={methods.formState.isSubmitting}
              >
                {(['light', 'dark', 'system'] as const).map((theme) => (
                  <RadioCardItem
                    key={theme}
                    value={theme}
                    className="border-none p-0 hover:bg-transparent data-[state=checked]:bg-transparent"
                    checkClassName="bottom-8 group-data-[state=checked]:bg-blue-500 group-data-[state=checked]:!border-blue-500"
                  >
                    <FormLabel className="cursor-pointer">
                      <ThemeOption theme={theme} />
                    </FormLabel>
                  </RadioCardItem>
                ))}
              </RadioCards>
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
