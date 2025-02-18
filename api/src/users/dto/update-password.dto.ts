import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class UpdatePasswordInput {
  @IsString()
  readonly currentPassword: string;

  @IsStrongPassword({}, { message: 'New password is too weak' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'New password is too short' })
  readonly newPassword: string;
}
