import { DayOfWeek, InvitationStatus, Role } from '@prisma/client';
import { v4 } from 'uuid';

import { stripeServer } from '@/lib/billing/stripe-server';
import { Tier } from '@/lib/billing/tier';
import { updateStripeSubscriptionQuantity } from '@/lib/billing/update-stripe-subscription-quantity';
import { prisma } from '@/lib/db/prisma';
import { matchLocale } from '@/lib/i18n/match-locale';
import { createTimeSlot } from '@/lib/utils';

async function createStripeCustomer(input: {
  name: string;
  email: string;
  organizationId: string;
}): Promise<string> {
  try {
    const stripeCustomer = await stripeServer.customers.create({
      name: input.name,
      email: input.email,
      metadata: {
        organizationId: input.organizationId
      }
    });

    return stripeCustomer.id;
  } catch (e) {
    console.error(e);
  }

  return '';
}

export async function createUserWithOrganization(input: {
  name: string;
  email: string;
  hashedPassword: string;
  locale?: string;
}): Promise<string> {
  const organizationId = v4();
  const initialName = 'My Organization';
  const locale = matchLocale(input.locale);
  const stripeCustomerId = await createStripeCustomer({
    name: initialName,
    email: input.email,
    organizationId
  });
  if (!stripeCustomerId) {
    console.warn('Stripe customer ID is missing');
  }

  await prisma.organization.create({
    data: {
      id: organizationId,
      name: initialName,
      stripeCustomerId,
      completedOnboarding: false,
      tier: Tier.Free,
      businessHours: createDefaultBusinessHours(),
      users: {
        create: {
          name: input.name,
          email: input.email,
          password: input.hashedPassword,
          role: Role.ADMIN,
          locale,
          completedOnboarding: false
        }
      }
    },
    select: {
      id: true // SELECT NONE
    }
  });

  return organizationId;
}

export async function createOrganizationAndConnectUser(input: {
  userId: string;
  normalizedEmail: string;
}): Promise<string> {
  const organizationId = v4();
  const initialName = 'My Organization';
  const stripeCustomerId = await createStripeCustomer({
    name: initialName,
    email: input.normalizedEmail,
    organizationId
  });
  if (!stripeCustomerId) {
    console.warn('Stripe customer ID is missing');
  }

  await prisma.$transaction([
    prisma.organization.create({
      data: {
        id: organizationId,
        name: initialName,
        stripeCustomerId,
        completedOnboarding: false,
        tier: Tier.Free,
        businessHours: createDefaultBusinessHours(),
        users: {
          connect: {
            id: input.userId
          }
        }
      },
      select: {
        id: true // SELECT NONE
      }
    }),
    prisma.changeEmailRequest.deleteMany({
      where: { email: input.normalizedEmail }
    }),
    prisma.resetPasswordRequest.deleteMany({
      where: { email: input.normalizedEmail }
    }),
    prisma.user.update({
      where: { id: input.userId },
      data: { role: Role.ADMIN },
      select: {
        id: true // SELECT NONE
      }
    })
  ]);

  return organizationId;
}

export async function joinOrganization(input: {
  invitationId: string;
  organizationId: string;
  name: string;
  normalizedEmail: string;
  hashedPassword: string;
  role: Role;
}): Promise<void> {
  await prisma.$transaction([
    prisma.invitation.updateMany({
      where: { id: input.invitationId },
      data: { status: InvitationStatus.ACCEPTED }
    }),
    prisma.verificationToken.updateMany({
      where: { identifier: input.normalizedEmail },
      data: { expires: new Date(+0) }
    }),
    prisma.changeEmailRequest.deleteMany({
      where: { email: input.normalizedEmail }
    }),
    prisma.resetPasswordRequest.deleteMany({
      where: { email: input.normalizedEmail }
    }),
    prisma.user.create({
      data: {
        organizationId: input.organizationId,
        name: input.name,
        email: input.normalizedEmail,
        password: input.hashedPassword,
        role: input.role,
        locale: 'en-US',
        emailVerified: new Date(),
        completedOnboarding: false
      },
      select: {
        id: true
      }
    })
  ]);

  try {
    await updateStripeSubscriptionQuantity(input.organizationId);
  } catch (e) {
    console.error(e);
  }
}

function createDefaultBusinessHours() {
  return {
    create: [
      {
        dayOfWeek: DayOfWeek.SUNDAY
      },
      {
        dayOfWeek: DayOfWeek.MONDAY,
        timeSlots: {
          create: {
            start: createTimeSlot(9, 0),
            end: createTimeSlot(17, 0)
          }
        }
      },
      {
        dayOfWeek: DayOfWeek.TUESDAY,
        timeSlots: {
          create: {
            start: createTimeSlot(9, 0),
            end: createTimeSlot(17, 0)
          }
        }
      },
      {
        dayOfWeek: DayOfWeek.WEDNESDAY,
        timeSlots: {
          create: {
            start: createTimeSlot(9, 0),
            end: createTimeSlot(17, 0)
          }
        }
      },
      {
        dayOfWeek: DayOfWeek.THURSDAY,
        timeSlots: {
          create: {
            start: createTimeSlot(9, 0),
            end: createTimeSlot(17, 0)
          }
        }
      },
      {
        dayOfWeek: DayOfWeek.FRIDAY,
        timeSlots: {
          create: {
            start: createTimeSlot(9, 0),
            end: createTimeSlot(17, 0)
          }
        }
      },
      {
        dayOfWeek: DayOfWeek.SATURDAY
      }
    ]
  };
}
