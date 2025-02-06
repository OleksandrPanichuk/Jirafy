import { IsArray, IsMongoId } from 'class-validator';

export class AcceptInviteInput {
  @IsArray()
  @IsMongoId({ each: true })
  readonly invites: string[];
}
