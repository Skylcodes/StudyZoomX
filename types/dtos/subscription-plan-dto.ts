import type { Maybe } from '@/types/maybe';

export type SubscriptionPlanDto = {
  displayName: string;
  isCanceled: boolean;
  stripeCurrentPeriodStart: Maybe<number>;
  stripeCurrentPeriodEnd: Maybe<number>;
};
