import {
  IsArray,
  IsMongoId,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

class Data {
  @IsMongoId()
  readonly projectId: string;

  @IsNumber()
  @Min(0)
  readonly order: number;
}

export class ReorderProjectInput {
  @IsMongoId()
  readonly workspaceId: string;

  @IsArray()
  @ValidateNested()
  readonly data: Data[];
}
