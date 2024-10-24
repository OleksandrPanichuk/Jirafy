import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInInput {
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
