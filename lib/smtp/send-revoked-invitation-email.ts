import { render } from '@react-email/render';

import {
  RevokedInvitationEmail,
  type RevokedInvitationEmailData
} from '@/emails/revoked-invitation-email';
import { sendEmail } from '@/lib/smtp/mailer/send-email';

export async function sendRevokedInvitationEmail(
  data: RevokedInvitationEmailData
): Promise<void> {
  const component = RevokedInvitationEmail(data);
  const html = await render(component);
  const text = await render(component, { plainText: true });

  await sendEmail({
    recipient: data.recipient,
    subject: 'Invitation revoked',
    html,
    text
  });
}
