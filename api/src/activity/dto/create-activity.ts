import { ActivityType } from '@prisma/client';
import { IsEnum, IsMongoId, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateActivityInput {
  @IsEnum(ActivityType)
  readonly type: ActivityType;

  @IsOptional()
  @IsString()
  readonly data?: string;

  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

	@IsOptional()
	@ValidateIf(o => !o.issueId && !o.projectId)
	@IsMongoId()
	readonly workspaceId?: string;

	@IsOptional()
	@ValidateIf(o => !o.workspaceId && !o.projectId)
	@IsMongoId()
	readonly issueId?: string;

	@IsOptional()
	@ValidateIf(o => !o.workspaceId && !o.issueId)
	@IsMongoId()
	readonly projectId?: string;
}
