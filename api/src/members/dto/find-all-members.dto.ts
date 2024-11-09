import { Transform } from 'class-transformer';
import {
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
}

export class FindAllMembersInput extends FindAllMembersQuery {
  @IsString()
  @IsNotEmpty()
  readonly slug: string;
}
