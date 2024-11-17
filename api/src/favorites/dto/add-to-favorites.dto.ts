import { IsMongoId } from 'class-validator';

export class AddToFavoritesInput {
  @IsMongoId()
  readonly projectId: string;

  @IsMongoId()
  readonly memberId: string;
}
