import { CurrentUser } from '@/common/decorators';
import { AuthenticatedGuard } from '@/common/guards';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
}
