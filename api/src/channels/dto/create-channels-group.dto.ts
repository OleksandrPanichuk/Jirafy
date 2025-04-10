import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateChannelsGroupInput {
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  readonly name: string;

  @IsMongoId()
  readonly workspaceId: string;
}
