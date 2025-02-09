import { InviteState } from '@prisma/client';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class FindAllUserInvitesQuery {
  @IsEnum(InviteState)
  readonly state: InviteState = InviteState.PENDING;
}

export class FindAllWorkspaceInvitesQuery {
  @IsOptional()
  @IsEnum(InviteState)
  readonly state: InviteState;

  @IsMongoId()
  readonly workspaceId: string;
}
