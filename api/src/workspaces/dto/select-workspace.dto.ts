import { IsMongoId } from 'class-validator';

export class SelectWorkspaceInput {
  @IsMongoId()
  readonly workspaceId: string;
}
