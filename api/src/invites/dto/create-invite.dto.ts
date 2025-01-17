import { OnlyOneFieldConstraint } from '@/shared/constraints'
import { InviteMemberRole } from '@prisma/client';
import { IsEmail, IsEnum, IsMongoId, Validate, ValidateIf } from 'class-validator';

export class CreateInviteInput {
  @IsEmail()
  readonly email: string;

  @ValidateIf((o) => !o.projectId)
  @IsMongoId()
  readonly workspaceId?: string;

  @ValidateIf((o) => !o.workspaceId)
  @IsMongoId()
  readonly projectId?: string;

  @IsEnum(InviteMemberRole)
  readonly role: InviteMemberRole;

  @Validate(OnlyOneFieldConstraint, [['projectId', 'workspaceId']])
  private validateFields(input:CreateInviteInput) {
    return input;
  }
}
