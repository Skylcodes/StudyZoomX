'use client';

import { CenteredSpinner } from '@/components/ui/spinner';
import { useTransitionContext } from '@/hooks/use-transition-context';

export function HomeSpinner(): React.JSX.Element {
  const { isLoading } = useTransitionContext();
  if (!isLoading) {
    return <></>;
  }
  return <CenteredSpinner />;
}
