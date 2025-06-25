import Stripe from 'stripe';

export const stripeServer = Object.freeze(
  new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2024-06-20'
  })
);
