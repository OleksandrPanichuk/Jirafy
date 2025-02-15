import { MemberType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class FindAllMembersQuery {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly take?: number;

  @IsMongoId()
  @IsOptional()
  readonly cursor?: string | null;

  @IsString()
  @IsOptional()
  readonly searchValue?: string;

  @Transform(({ value }) => value === 'true')
  @IsOptional()
  readonly withUser?: boolean;
}

export class FindAllMembersInput extends FindAllMembersQuery {
  @IsString()
  @IsNotEmpty()
  @IsEnum(MemberType)
  readonly type: MemberType;

  @IsString()
  readonly identifier: string;
}
