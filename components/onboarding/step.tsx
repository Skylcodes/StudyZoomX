'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type StepProps = React.HtmlHTMLAttributes<HTMLButtonElement> & {
  step: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

export function Step({
  step,
  currentStep,
  setCurrentStep,
  className,
  ...other
}: StepProps): React.JSX.Element {
  const active = step <= currentStep;
  const disabled = !active || currentStep === step;
  const navigate = (): void => {
    setCurrentStep(step);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };
  return (
    <button
      className={cn(
        'h-1 w-full rounded-[1px]',
        active ? 'bg-primary' : 'bg-muted',
        className
      )}
      type="button"
      tabIndex={-1}
      disabled={disabled}
      onClick={navigate}
      {...other}
    />
  );
}
