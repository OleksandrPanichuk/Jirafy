import { IsEmail } from 'class-validator';

export class SendVerificationLinkInput {
  @IsEmail(undefined, { message: 'Invalid email' })
  email: string;
}
