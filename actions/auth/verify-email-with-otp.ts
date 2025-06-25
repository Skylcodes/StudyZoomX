'use server';

import { redirect } from 'next/navigation';
import { isAfter } from 'date-fns';

import { actionClient } from '@/actions/safe-action';
import { Routes } from '@/constants/routes';
import { createHash } from '@/lib/auth/utils';
import { verifyEmail } from '@/lib/auth/verification';
import { prisma } from '@/lib/db/prisma';
import { sendWelcomeEmail } from '@/lib/smtp/send-welcome-email';
import { NotFoundError } from '@/lib/validation/exceptions';
import { verifyEmailWithOtpSchema } from '@/schemas/auth/verify-email-with-otp-schema';

export const verifyEmailWithOtp = actionClient
  .metadata({ actionName: 'verifyEmailWithOtp' })
  .schema(verifyEmailWithOtpSchema)
  .action(async ({ parsedInput }) => {
    const hashedOtp = await createHash(
      `${parsedInput.otp.toUpperCase()}${process.env.AUTH_SECRET}`
    );
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token: hashedOtp },
      select: { identifier: true, expires: true }
    });
    if (!verificationToken) {
      throw new NotFoundError('Verificaton token not found.');
    }
    const user = await prisma.user.findFirst({
      where: { email: verificationToken.identifier },
      select: {
        email: true,
        name: true,
        emailVerified: true
      }
    });
    if (!user) {
      throw new NotFoundError('User not found.');
    }
    if (user.emailVerified) {
      return redirect(Routes.VerifyEmailSuccess);
    }

    if (isAfter(new Date(), verificationToken.expires)) {
      return redirect(
        `${Routes.VerifyEmailExpired}?email=${verificationToken.identifier}`
      );
    }

    await verifyEmail(verificationToken.identifier);

    await sendWelcomeEmail({
      name: user.name,
      recipient: user.email!
    });

    return redirect(Routes.VerifyEmailSuccess);
  });
