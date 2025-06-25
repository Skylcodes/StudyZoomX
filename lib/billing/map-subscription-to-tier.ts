import { Tier } from '@/lib/billing/tier';
import type { Subscription } from '@/types/subscription';

export function mapSubscriptionToTier(subscription?: Subscription): Tier {
  if (subscription && subscription.plan && subscription.plan.product) {
    if (subscription.plan.product === process.env.PRO_PRODUCT_ID) {
      return subscription.cancel_at_period_end
        ? Tier.ProPendingCancel
        : Tier.Pro;
    }
  }

  return Tier.Free;
}
