import { IsNotEmpty, IsString } from 'class-validator';

export class JoinProjectInput {
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;
}
