import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

type Props = {
  name: string;
  link: string;
};

const main = {
  backgroundColor: '#f6f9fc',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '40px',
  maxWidth: '600px',
  margin: '0 auto',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '20px',
};

const link = {
  color: '#1a73e8',
  textDecoration: 'none',
};

const VerifyEmail = ({ name, link: verificationLink }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Hi {name},</Heading>
          <Text style={paragraph}>
            We just need to verify your email address before you can access{' '}
            Jirafy.
          </Text>
          <Text style={paragraph}>
            <Link href={verificationLink} style={link}>
              Verify your email address
            </Link>
          </Text>
          <Text style={paragraph}>Thanks! – The Jirafy team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerifyEmail;
