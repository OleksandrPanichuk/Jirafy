import { ChannelType } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';

export class UpdateChannelInput {
  @IsNotEmpty()
  @IsString()
  @Validate((val) => val !== 'general', {
    message: "Channel name cannot be 'general'",
  })
  @IsOptional()
  readonly name: string;

  @IsEnum(ChannelType)
  readonly type: ChannelType;

  @IsMongoId()
  readonly groupId: string;
}
