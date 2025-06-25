'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { type ZodSchema } from 'zod';

import { completeOnboarding } from '@/actions/onboarding/complete-onboarding';
import { completeOrganizationOnlyOnboarding } from '@/actions/onboarding/complete-organization-only-onboarding';
import { completeUserOnlyOnboarding } from '@/actions/onboarding/complete-user-only-onboarding';
import { OnboardingOrganizationStep } from '@/components/onboarding/onboarding-organization-step';
import { OnboardingProfileStep } from '@/components/onboarding/onboarding-profile-step';
import { OnboardingThemeStep } from '@/components/onboarding/onboarding-theme-step';
import { StepIndicator } from '@/components/onboarding/step-indicator';
import { FormProvider } from '@/components/ui/form';
import { Logo } from '@/components/ui/logo';
import type { getOnboardingData } from '@/data/onboarding/get-onboarding-data';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import { type CompleteOnboardingSchema } from '@/schemas/onboarding/complete-onboarding-schema';
import {
  completeOrganizationOnboardingSchema,
  type CompleteOrganizationOnboardingSchema
} from '@/schemas/onboarding/complete-organization-onboarding-schema';
import {
  completeUserOnboardingSchema,
  type CompleteUserOnboardingSchema
} from '@/schemas/onboarding/complete-user-onboarding-schema';
import { FileUploadAction } from '@/types/file-upload-action';

export enum Step {
  Organization,
  Theme,
  Profile
}

const headers: Record<Step, string> = {
  [Step.Organization]: 'Organization details',
  [Step.Theme]: 'Choose your theme',
  [Step.Profile]: 'Set up your profile'
};

const descriptions: Record<Step, string> = {
  [Step.Organization]:
    'We just need some basic info to get your organization set up. You’ll be able to edit this later.',
  [Step.Theme]:
    'Select the theme for the application. You’ll be able to change this later.',
  [Step.Profile]:
    "Check if the profile information is correct. You'll be able to change this later in the account settings page."
};

const components: Record<
  Step,
  | typeof OnboardingOrganizationStep
  | typeof OnboardingThemeStep
  | typeof OnboardingProfileStep
> = {
  [Step.Organization]: OnboardingOrganizationStep,
  [Step.Theme]: OnboardingThemeStep,
  [Step.Profile]: OnboardingProfileStep
};

export type OnboardingWizardProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  Awaited<ReturnType<typeof getOnboardingData>>;

const stepSchemas: Record<Step, ZodSchema> = {
  [Step.Organization]: completeOrganizationOnboardingSchema,
  [Step.Theme]: completeUserOnboardingSchema,
  [Step.Profile]: completeUserOnboardingSchema
};

const generateSteps = (
  organizationCompletedOnboarding: boolean,
  userCompletedOnboarding: boolean
): Step[] => {
  const steps: Step[] = [];

  if (!organizationCompletedOnboarding) {
    steps.push(Step.Organization);
  }

  if (!userCompletedOnboarding) {
    steps.push(Step.Theme);
    steps.push(Step.Profile);
  }

  return steps;
};

const validate = (currentStep: Step, values: Record<string, unknown>) => {
  switch (currentStep) {
    case Step.Organization:
      return completeOrganizationOnboardingSchema.safeParse(values).success;
    case Step.Profile:
      return completeUserOnboardingSchema.safeParse(values).success;
    default:
      return true;
  }
};

export function OnboardingWizard({
  organization,
  user,
  className,
  ...other
}: OnboardingWizardProps): React.JSX.Element {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = React.useState<Step>(
    !organization.completedOnboarding ? Step.Organization : Step.Theme
  );
  const methods = useZodForm({
    schema: stepSchemas[currentStep],
    mode: 'all',
    defaultValues: {
      organizationName: organization?.name ?? '',
      action: FileUploadAction.None,
      image: user?.image,
      name: user?.name ?? 'Unkown',
      theme: (theme as 'light' | 'dark' | 'system') ?? 'system'
    }
  });
  const Component = components[currentStep];
  const steps: Step[] = generateSteps(
    organization.completedOnboarding,
    user.completedOnboarding
  );
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;
  const formValues = methods.getValues();
  const isCurrentStepValid = validate(currentStep, formValues);
  const canSubmit =
    !methods.formState.isSubmitting && methods.formState.isValid;

  const handleScrollToTop = (): void => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const onSubmit: SubmitHandler<
    | CompleteOnboardingSchema
    | CompleteOrganizationOnboardingSchema
    | CompleteUserOnboardingSchema
  > = async (values) => {
    if (!canSubmit || !isCurrentStepValid) {
      return;
    }

    if (!isLastStep) {
      handleNext();
      return;
    }

    let result;

    if (!user.completedOnboarding && !organization.completedOnboarding) {
      result = await completeOnboarding(values as CompleteOnboardingSchema);
    } else if (!user.completedOnboarding) {
      const variables = values as CompleteUserOnboardingSchema;
      result = await completeUserOnlyOnboarding({
        action: variables.action,
        image: variables.image,
        name: variables.name,
        phone: variables.phone,
        theme: variables.theme
      });
    } else if (!organization.completedOnboarding) {
      const variables = values as CompleteOrganizationOnboardingSchema;
      result = await completeOrganizationOnlyOnboarding({
        organizationName: variables.organizationName
      });
    }

    if (result?.serverError || result?.validationErrors) {
      toast.error("Couldn't complete onboarding");
      return;
    }

    toast.success('Onboarding completed');
  };
  const handleNext = (): void => {
    if (!isCurrentStepValid) {
      return;
    }

    if (isLastStep) {
      methods.handleSubmit(onSubmit)();
      return;
    }

    switch (currentStep) {
      case Step.Organization:
        setCurrentStep(Step.Theme);
        handleScrollToTop();
        break;
      case Step.Theme:
        setCurrentStep(Step.Profile);
        handleScrollToTop();
        break;
    }
  };

  return (
    <div
      className={cn('flex flex-col pb-1.5', className)}
      {...other}
    >
      <div className="mx-auto mt-6">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
      </div>
      <div className="mx-auto w-full max-w-lg p-4 sm:p-8 md:p-12">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex w-48 flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
              <StepIndicator
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep as (value: number) => void}
              />
            </div>
            <h1 className="text-3xl font-medium">{headers[currentStep]}</h1>
            <p className="text-base text-muted-foreground">
              {descriptions[currentStep]}
            </p>
            <Component
              canSubmit={isCurrentStepValid && !methods.formState.isSubmitting}
              loading={methods.formState.isSubmitting}
              isLastStep={isLastStep}
              email={user?.email ?? ''}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
