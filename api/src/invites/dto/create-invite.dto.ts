import { OnlyOneFieldConstraint } from '@/shared/constraints';
import { InviteMemberRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  Validate,
  ValidateIf,
} from 'class-validator';

export class CreateInviteInput {
  @IsEmail()
  readonly email: string;

  @ValidateIf((o) => !o.projectId)
  @IsMongoId()
  readonly workspaceId: string;

  @IsEnum(InviteMemberRole)
  readonly role: InviteMemberRole;
}
