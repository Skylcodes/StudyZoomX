import { mapSubscriptionToTier } from '@/lib/billing/map-subscription-to-tier';
import { pickSubscription } from '@/lib/billing/pick-subscription';
import { stripeServer } from '@/lib/billing/stripe-server';
import { prisma } from '@/lib/db/prisma';
import type { Maybe } from '@/types/maybe';

export async function updateOrganizationSubscriptionPlan(
  stripeCustomerId: Maybe<string>
): Promise<void> {
  if (!stripeCustomerId) {
    return;
  }
  const organization = await prisma.organization.findFirst({
    where: { stripeCustomerId },
    select: {
      id: true,
      tier: true,
      stripeCustomerId: true
    }
  });
  if (!organization || !organization.stripeCustomerId) {
    return;
  }

  const subscriptionsResponse = await stripeServer.subscriptions.list({
    customer: organization.stripeCustomerId
  });

  const subscriptions = subscriptionsResponse.data || [];
  const subscription = pickSubscription(subscriptions);
  const tier = mapSubscriptionToTier(subscription);

  if (tier !== organization.tier) {
    await prisma.organization.update({
      where: { id: organization.id },
      data: { tier }
    });
  }
}
