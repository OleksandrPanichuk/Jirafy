import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ActivityType } from '../activity.types';

export class FindAllActivityInput {
  @IsMongoId()
  readonly identifier: string;

  @IsEnum(ActivityType)
  readonly type: ActivityType;

  @IsOptional()
  @IsNumber()
  readonly take?: number;

  @IsOptional()
  @IsString()
  readonly cursor?: string;
}
