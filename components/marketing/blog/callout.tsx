import * as React from 'react';

import {
  Alert,
  AlertDescription,
  AlertProps,
  AlertTitle
} from '@/components/ui/alert';

type CalloutProps = AlertProps & {
  icon?: string;
  title?: string;
};

export function Callout({
  title,
  children,
  icon,
  ...props
}: CalloutProps): React.JSX.Element {
  return (
    <Alert {...props}>
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
