import { IsEmail } from 'class-validator';

export class VerifyInput {
  @IsEmail()
  readonly email: string;
}
