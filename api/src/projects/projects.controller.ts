import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreateProjectInput,
  FindAllProjectsWithFiltersInput,
  JoinProjectInput,
  ReorderProjectInput,
} from './dto';
import { ProjectsService } from './projects.service';

@UseGuards(AuthenticatedGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('by-workspace-slug/:slug')
  findAllByWorkspaceSlug(
    @Param('slug') slug: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.findAllByWorkspaceSlug(slug, userId);
  }

  @Post('by-workspace-slug/:slug/with-filters')
  findAllProjectsByWorkspaceSlugWithMembers(
    @Param('slug') slug: string,
    @Body() filters: FindAllProjectsWithFiltersInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.findAllByWorkspaceSlugWithFilters(
      filters,
      slug,
      userId,
    );
  }

  @Post('')
  create(@Body() dto: CreateProjectInput, @CurrentUser('id') userId: string) {
    return this.projectsService.create(dto, userId);
  }

  @Post('join')
  join(@Body() dto: JoinProjectInput, @CurrentUser('id') userId: string) {
    return this.projectsService.join(dto, userId);
  }

  @Put('reorder')
  reorder(@Body() dto: ReorderProjectInput, @CurrentUser('id') userId: string) {
    return this.projectsService.reorder(dto, userId);
  }
}
