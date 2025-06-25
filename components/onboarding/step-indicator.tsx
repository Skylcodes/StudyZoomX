import * as React from 'react';

import { Step } from '@/components/onboarding/step';
import { cn } from '@/lib/utils';

export type StepIndicatorProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  steps: number[];
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

export function StepIndicator({
  steps,
  currentStep,
  setCurrentStep,
  className,
  ...other
}: StepIndicatorProps): React.JSX.Element {
  return (
    <div
      className={cn('flex flex-row gap-2', className)}
      {...other}
    >
      {steps.map((step, idx) => (
        <Step
          key={step}
          step={idx}
          currentStep={steps.indexOf(currentStep)}
          setCurrentStep={setCurrentStep}
        />
      ))}
    </div>
  );
}
