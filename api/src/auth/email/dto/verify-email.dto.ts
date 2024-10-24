import { IsUUID } from 'class-validator';

export class VerifyEmailInput {
  @IsUUID('4', { message: 'Invalid token' })
  token: string;
}
