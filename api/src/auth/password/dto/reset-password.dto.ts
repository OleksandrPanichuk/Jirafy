import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { VerifyTokenInput } from './verify-token.dto';

export class ResetPasswordInput extends VerifyTokenInput {
  @IsStrongPassword({}, { message: 'Password is too weak' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short' })
  readonly password: string;
}
