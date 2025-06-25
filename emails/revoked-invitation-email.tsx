import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import { AppInfo } from '@/constants/app-info';

export type RevokedInvitationEmailData = {
  recipient: string;

  organizationName: string;
};

export const RevokedInvitationEmail = ({
  organizationName
}: RevokedInvitationEmailData) => (
  <Html>
    <Head />
    <Preview>
      Invitation for {organizationName} on {AppInfo.APP_NAME} revoked
    </Preview>
    <Tailwind>
      <Body className="m-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            Invitation for <strong>{organizationName}</strong> on{' '}
            <strong>{AppInfo.APP_NAME}</strong> revoked
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">Hello,</Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Your invitation to join <strong>{organizationName}</strong> has been
            revoked.
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            If the revocation was unexpected, ask an admin on the organization
            to send you a new invitation link.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
