import { UploadedFile } from '@/shared/interfaces';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class UpdateWorkspaceInput {
  @ValidateIf((obj, value) => value !== null)
  @IsOptional()
  @ValidateNested()
  readonly logo?: UploadedFile | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly size?: number;
}
