import { MemberType } from '@prisma/client'
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
  // Transfrom values from type string to type number
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


  @IsString()
  @IsNotEmpty()
  @IsEnum(MemberType)
  readonly type: MemberType;  
}


