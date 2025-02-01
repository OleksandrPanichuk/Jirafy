import { InviteState } from '@prisma/client';
import { IsEnum, IsMongoId } from 'class-validator';

export class FindAllUserInvitesQuery {
  @IsEnum(InviteState)
  readonly state: InviteState = InviteState.PENDING;
}

export class FindAllWorkspaceInvitesQuery {
  @IsEnum(InviteState)
  readonly state: InviteState = InviteState.PENDING;

  @IsMongoId()
  readonly workspaceId: string;
}
