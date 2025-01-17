import { Body, Container, Heading, Html, Text } from '@react-email/components';

interface Props {
  name: string;
  invitationPlace: string;
}

const Invitation = ({ name, invitationPlace }: Props) => {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Hi {name},</Heading>
          <Text>You have been invited to join {invitationPlace}.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default Invitation;
