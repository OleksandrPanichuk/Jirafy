import { Button, Container, Html, Text } from '@react-email/components';

type Props = {
  email: string;
  link: string;
};

const ResetPassword = ({ email, link }: Props) => {
  return (
    <Html>
      <Container>
        <Text>Hi, {email}.</Text>
        <Text>
          You have requested to reset your password. Please click the link below
          to reset your password.
        </Text>
        <Button href={link}>
          Reset password
        </Button>
      </Container>
    </Html>
  );
};

export default ResetPassword;
