import { InviteMemberRole } from '@prisma/client';
import { IsEnum, IsMongoId } from 'class-validator';

export class UpdateMemberParams {
  @IsMongoId()
  readonly memberId: string;
}

export class UpdateMemberRoleInput {
  @IsEnum(InviteMemberRole)
  readonly role: InviteMemberRole;
}
