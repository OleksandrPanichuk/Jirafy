import { IsUUID } from 'class-validator';

export class VerifyEmailInput {
  @IsUUID('4', { message: 'Invalid token' })
  readonly token: string;
}
