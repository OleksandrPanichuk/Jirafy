import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddToFavoritesInput, RemoveFromFavoritesInput } from './dto';
import { FavoritesService } from './favorites.service';

@UseGuards(AuthenticatedGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/by-workspace-slug/:workspaceSlug')
  findAll(
    @Param('workspaceSlug') slug: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.favoritesService.findAll(slug, userId);
  }

  @Post('')
  add(@Body() dto: AddToFavoritesInput, @CurrentUser('id') userId: string) {
    return this.favoritesService.add(dto, userId);
  }

  @Delete('')
  remove(
    @Body() dto: RemoveFromFavoritesInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.favoritesService.remove(dto, userId);
  }
}
