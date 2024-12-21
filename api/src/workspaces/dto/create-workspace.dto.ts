import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateWorkspaceInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsNumber()
  @IsPositive()
  readonly size: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly slug: string;
}
