import { SortOrder } from '@/shared/enums';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Network } from '@prisma/client';


export class FindAllProjectsWithFiltersInput {
  @IsOptional()
  @IsEnum(SortOrder)
  readonly sortOrder?: SortOrder;

  @IsOptional()
  @IsEnum(['name', 'createdAt', 'membersCount'])
  readonly sortBy?: 'name' | 'createdAt' | 'membersCount';

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly searchValue?: string;

  @IsOptional()
  @IsBoolean()
  readonly onlyMyProjects?: boolean;

  @IsOptional()
  @IsEnum(Network, { each: true })
  @IsArray()
  readonly network?: Network[];

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  readonly leadersIds?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly takeMembers?: number;
}
