import { Network } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class ProjectCover {
  @IsString()
  @IsUrl()
  readonly url: string;

  @IsOptional()
  @IsString()
  readonly key?: string;
}

export class CreateProjectInput {
  @ValidateNested()
  readonly cover: ProjectCover;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Project name is too short' })
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Project description is too short' })
  readonly description?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5, { message: 'Project identifier is too long' })
  readonly identifier: string;

  @IsEnum(Network, { message: 'Invalid network type' })
  readonly network: Network;

  @IsOptional()
  @IsString()
  @IsMongoId()
  readonly leadId?: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly workspaceId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly emoji?: string;
}
