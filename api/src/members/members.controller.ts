import { CurrentUser } from '@/common/decorators';
import { AuthenticatedGuard } from '@/common/guards';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FindAllMembersQuery } from './dto';
import { MembersService } from './members.service';

@UseGuards(AuthenticatedGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/by-workspace-slug/:slug')
  findAll(
    @Param('slug') slug: string,
    @Query() query: FindAllMembersQuery,
    @CurrentUser('id') userId: string,
  ) {
    return this.membersService.findAll({ slug, ...query }, userId);
  }
}
