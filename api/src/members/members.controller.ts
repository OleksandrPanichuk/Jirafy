import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllMembersQuery } from './dto';
import { MembersService } from './members.service';
import { MemberType } from '@prisma/client';
import {
  UpdateMemberParams,
  UpdateMemberRoleInput,
} from '@/members/dto/update-member.dto';

@UseGuards(AuthenticatedGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/by-workspace-slug/:slug')
  findAllByWorkspaceId(
    @Param('slug') slug: string,
    @Query() query: FindAllMembersQuery,
    @CurrentUser('id') userId: string,
  ) {
    return this.membersService.findAll(
      {
        ...query,
        identifier: slug,
        type: MemberType.WORKSPACE,
      },
      userId,
    );
  }

  @Patch('/:memberId/role')
  updateRole(
    @Param() params: UpdateMemberParams,
    @Body() dto: UpdateMemberRoleInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.membersService.updateRole(dto, params.memberId, userId);
  }
}
