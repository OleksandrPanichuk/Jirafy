import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateChannelsGroupInput {
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  readonly name: string;
}
