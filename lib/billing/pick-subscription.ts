import type { Subscription } from '@/types/subscription';

export function pickSubscription(
  subscriptions: Subscription[]
): Subscription | undefined {
  if (subscriptions && subscriptions.length > 0) {
    if (subscriptions.length > 1) {
      console.warn(
        'Multiple subscriptions found. Picking the first subscription.'
      );
    }

    return subscriptions[0];
  }

  return undefined;
}
