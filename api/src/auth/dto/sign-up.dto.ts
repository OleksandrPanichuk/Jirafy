import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';

class SignUpAvatar {
  @IsOptional()
  @IsUrl()
  readonly url: string;
}

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

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Username is too short' })
  readonly username: string;

  @IsOptional()
  @IsBoolean()
  readonly verified?: boolean;

  @IsOptional()
  @ValidateNested()
  readonly avatar?: SignUpAvatar;
}
