import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";
  
interface InviteUserEmailProps {
    username: string;
    invitedByUsername: string;
    invitedByEmail: string;
    teamName: string;
    inviteLink: string;
    inviteFromIp?: string;
    inviteFromLocation?: string;
}
  
export const InviteUserEmail = ({
    username,
    invitedByUsername,
    invitedByEmail,
    teamName,
    inviteLink,
    inviteFromIp,
    inviteFromLocation,
}: InviteUserEmailProps) => {
    const previewText = `Join ${invitedByUsername} on Rester`;
  
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-[#E7E9EE] my-auto mx-auto font-sans px-2 py-10">
                    <Container className="border border-solid border-[#8B94AD] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Heading className="text-[#0B1841] text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                        Join <strong>{teamName}</strong> on <strong>Rester</strong>
                        </Heading>
                        <Text className="text-[#111318] text-[14px] leading-[24px]">
                        Hello {username},
                        </Text>
                        <Text className="text-[#111318] text-[14px] leading-[24px]">
                        <strong>{invitedByUsername}</strong> (
                        <Link
                            href={`mailto:${invitedByEmail}`}
                            className="text-[#2650D9] no-underline"
                        >
                            {invitedByEmail}
                        </Link>
                        ) has invited you to the <strong>{teamName}</strong> team on{" "}
                        <strong>Rester</strong>.
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                        <Button
                            className="bg-[#2650D9] rounded text-[#DBE2FA] text-[12px] font-semibold no-underline text-center px-5 py-3"
                            href={inviteLink}
                        >
                            Join the team
                        </Button>
                        </Section>
                        <Text className="text-[#111318] text-[14px] leading-[24px]">
                        or copy and paste this URL into your browser:{" "}
                        <Link href={inviteLink} className="text-[#2650D9] no-underline">
                            {inviteLink}
                        </Link>
                        </Text>
                        <Hr className="border border-solid border-[#8B94AD] my-[26px] mx-0 w-full" />
                        <Text className="text-[#4C556B] text-[12px] leading-[24px]">
                        This invitation was intended for{" "}
                        <span className="text-[#111318]">{username}</span>. This invite was
                        sent from <span className="text-[#111318]">{inviteFromIp}</span>{" "}
                        located in{" "}
                        <span className="text-[#111318]">{inviteFromLocation}</span>. If you
                        were not expecting this invitation, you can ignore this email. If
                        you are concerned about your account's safety, please reply to
                        this email to get in touch with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default InviteUserEmail;