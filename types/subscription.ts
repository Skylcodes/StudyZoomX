import type Stripe from 'stripe';

export type Subscription = Stripe.Subscription & {
  plan?: Stripe.Plan;
};
