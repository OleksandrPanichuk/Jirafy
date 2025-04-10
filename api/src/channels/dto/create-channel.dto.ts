import { ChannelType } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';

export class CreateChannelInput {
  @IsNotEmpty()
  @IsString()
  @Validate((val) => val !== 'general', {
    message: "Channel name cannot be 'general'",
  })
  readonly name: string;


  @IsEnum(ChannelType)
  readonly type: ChannelType;

  @IsMongoId()
  readonly groupId: string;

  @IsMongoId()
  readonly workspaceId: string;
}
