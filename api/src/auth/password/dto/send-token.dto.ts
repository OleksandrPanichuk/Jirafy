import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendTokenInput {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}
