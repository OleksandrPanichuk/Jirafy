import { UploadedFile } from '@/shared/interfaces';
import {
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Last name is too short' })
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Last name is too short' })
  readonly lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Username is too short' })
  readonly username?: string;

  @ValidateNested()
  readonly coverImage?: UploadedFile;

	@ValidateNested()
	readonly avatar?: UploadedFile
}
