import { OnlyOneFieldConstraint } from '@/shared/constraints';
import { InviteState } from '@prisma/client';
import { IsEnum, IsMongoId, Validate, ValidateIf } from 'class-validator';

export class FindAllInvitesInput {
  @IsEnum(InviteState)
  readonly state: InviteState = InviteState.PENDING;

  @ValidateIf((o) => !o.workspaceId && !o.userId)
  @IsMongoId()
  readonly projectId: string;

  @ValidateIf((o) => !o.projectId && !o.userId)
  @IsMongoId()
  readonly workspaceId: string;

  @ValidateIf((o) => !o.projectId && !o.workspaceId)
  @IsMongoId()
  readonly userId: string;

  @Validate(OnlyOneFieldConstraint, [['projectId', 'workspaceId', 'userId']])
  private validateFields(input: FindAllInvitesInput) {
    return input;
  }
}
