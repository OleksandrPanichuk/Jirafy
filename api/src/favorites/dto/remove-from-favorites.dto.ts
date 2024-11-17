import { IsMongoId } from 'class-validator';

export class RemoveFromFavoritesInput {
  @IsMongoId()
  readonly memberId: string;

  @IsMongoId()
  readonly favoriteId: string;
}
