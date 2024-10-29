import { IsEmail } from 'class-validator';

export class ChangeEmailInput {
  @IsEmail(undefined, { message: 'Invalid email' })
  readonly newEmail: string;
}
