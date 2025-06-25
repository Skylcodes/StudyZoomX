import { BillingUnit } from '@/lib/billing/billing-unit';
import { pickSubscription } from '@/lib/billing/pick-subscription';
import { stripeServer } from '@/lib/billing/stripe-server';
import { prisma } from '@/lib/db/prisma';

export async function updateStripeSubscriptionQuantity(
  organizationId: string
): Promise<void> {
  if (process.env.BILLING_UNIT !== BillingUnit.PerSeat) {
    return;
  }

  const organization = await prisma.organization.findFirst({
    where: { id: organizationId },
    select: { stripeCustomerId: true, _count: { select: { users: true } } }
  });
  if (!organization || !organization.stripeCustomerId) {
    console.warn('Organization not found or missing stripeCustomerId');
    return;
  }

  const subscriptionsResponse = await stripeServer.subscriptions.list({
    customer: organization.stripeCustomerId
  });
  const subscriptions = subscriptionsResponse.data || [];
  const subscription = pickSubscription(subscriptions);

  if (subscription) {
    await stripeServer.subscriptions.update(subscription.id, {
      items: [
        {
          quantity: organization._count.users,
          id: subscription.items.data[0].id
        }
      ],
      billing_cycle_anchor: 'unchanged', // Keeps the current cycle
      proration_behavior: 'always_invoice' // Immediate invoice for changes
    });
  }
}
