import { Button, Container, Html, Text } from '@react-email/components';

type Props = {
  email: string;
  token: string;
};

const ResetPassword = ({ email, token }: Props) => {
  return (
    <Html>
      <Container>
        <Text>Hi, {email}.</Text>
        <Text>
          You have requested to reset your password. Please click the link below
          to reset your password.
        </Text>
        <Button href={`http://localhost:3000/reset-password?token=${token}`}>
          Reset password
        </Button>
      </Container>
    </Html>
  );
};

export default ResetPassword;
