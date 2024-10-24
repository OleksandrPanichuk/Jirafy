import { IsEmail } from 'class-validator';

export class SendTokenInput {
  @IsEmail(undefined, { message: 'Invalid email' })
  email: string;
}
