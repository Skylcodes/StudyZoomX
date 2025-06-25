import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';

export type NextButtonProps = ButtonProps & {
  isLastStep: boolean;
};

export function NextButton({
  isLastStep,
  ...rest
}: NextButtonProps): React.JSX.Element {
  return (
    <div>
      <Button
        type="submit"
        variant="default"
        className="mt-4"
        {...rest}
      >
        {isLastStep ? 'Finish' : 'Next step →'}
      </Button>
    </div>
  );
}
