import { createHash } from 'crypto';
import type { Account, NextAuthConfig, Profile, User } from 'next-auth';

import { createOrganizationAndConnectUser } from '@/lib/auth/organization';
import { verifyEmail } from '@/lib/auth/verification';
import { prisma } from '@/lib/db/prisma';
import { fetchAndResizeRemoteImage } from '@/lib/imaging/fetch-and-resize-remote-image';
import { resizeImage } from '@/lib/imaging/resize-image';
import { sendConnectedAccountSecurityAlertEmail } from '@/lib/smtp/send-connected-account-security-alert-email';
import { sendWelcomeEmail } from '@/lib/smtp/send-welcome-email';
import { getUserImageUrl } from '@/lib/urls/get-user-image-url';
import { OAuthIdentityProvider } from '@/types/identity-provider';

export const events = {
  async signIn({ user, account, profile, isNewUser }) {
    if (user && user.id) {
      await prisma.user.updateMany({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      });

      if (isNewUser && user.email) {
        if (!user.organizationId) {
          await createOrganizationAndConnectUser({
            userId: user.id,
            normalizedEmail: user.email.toLowerCase()
          });
        }
        if (account?.provider === OAuthIdentityProvider.Google) {
          await verifyEmail(user.email);
          await tryCopyGoogleImage(user, profile);
          if (user.name) {
            await sendWelcomeEmail({
              name: user.name,
              recipient: user.email!
            });
          }
        }
        if (account?.provider === OAuthIdentityProvider.MicrosoftEntraId) {
          await verifyEmail(user.email);
          await tryCopyMicrosoftGraphImage(user, account);
          if (user.name) {
            await sendWelcomeEmail({
              name: user.name,
              recipient: user.email!
            });
          }
        }
      }
    }
  },
  async signOut(message) {
    if ('session' in message && message.session?.sessionToken) {
      await prisma.session.deleteMany({
        where: { sessionToken: message.session.sessionToken }
      });
    }
  },
  async linkAccount({ user, account }) {
    if (user && user.name && user.email && account && account.provider) {
      // Here we check if the user just has been created using an OAuth provider
      // - If yes -> No need to send out security alert
      // - If no (which means linked using an existing account) -> Send out security alert
      const newUser = await prisma.user.findFirst({
        where: {
          email: user.email,
          lastLogin: null
        },
        select: {
          _count: {
            select: { accounts: true }
          }
        }
      });
      const isNewUser = newUser && newUser._count.accounts < 2;

      if (!isNewUser) {
        try {
          await sendConnectedAccountSecurityAlertEmail({
            recipient: user.email,
            name: user.name,
            action: 'connected',
            provider: account.provider
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
} satisfies NextAuthConfig['events'];

async function tryCopyGoogleImage(
  user: User,
  profile?: Profile
): Promise<void> {
  try {
    if (profile?.picture) {
      const image = await fetchAndResizeRemoteImage(profile.picture);
      if (image.bytes && image.contentType && image.hash) {
        const imageUrl = getUserImageUrl(user.id!, image.hash);
        await prisma.$transaction([
          prisma.userImage.create({
            data: {
              userId: user.id!,
              data: image.bytes,
              contentType: image.contentType,
              hash: image.hash
            },
            select: {
              id: true // SELECT NONE
            }
          }),
          prisma.user.update({
            where: { id: user.id },
            data: { image: imageUrl },
            select: {
              id: true // SELECT NONE
            }
          })
        ]);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function tryCopyMicrosoftGraphImage(
  user: User,
  account: Account
): Promise<void> {
  try {
    const profilePhotoSize = 96;
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
      { headers: { Authorization: `Bearer ${account.access_token}` } }
    );

    if (response.ok) {
      const mimeType = response.headers.get('content-type');
      if (mimeType) {
        const jsBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(new Uint8Array(jsBuffer));
        const bytes = await resizeImage(buffer, mimeType);
        const contentType = mimeType;
        const hash = createHash('sha256').update(bytes).digest('hex');
        if (bytes && contentType && hash) {
          const imageUrl = getUserImageUrl(user.id!, hash);
          await prisma.$transaction([
            prisma.userImage.create({
              data: {
                userId: user.id!,
                data: bytes,
                contentType: contentType,
                hash: hash
              },
              select: {
                id: true // SELECT NONE
              }
            }),
            prisma.user.update({
              where: { id: user.id },
              data: { image: imageUrl },
              select: {
                id: true // SELECT NONE
              }
            })
          ]);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}
