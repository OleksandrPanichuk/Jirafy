import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignUpInput {
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsStrongPassword({}, { message: 'Password is too weak' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'First name is too short' })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Last name is too short' })
  readonly lastName: string;
}
