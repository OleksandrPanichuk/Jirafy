import { ChannelType } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';

export class CreateChannelInput {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Channel name can only contain letters, numbers and underscore',
  })
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
