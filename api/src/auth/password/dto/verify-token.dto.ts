import { IsUUID } from 'class-validator';

export class VerifyTokenInput {
  @IsUUID('4', { message: 'Invalid token' })
  readonly token: string;
}
