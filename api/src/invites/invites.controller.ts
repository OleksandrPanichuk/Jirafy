import { CurrentUser } from '@/shared/decorators'
import { AuthenticatedGuard } from '@/shared/guards'
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import {
  AcceptInviteInput,
  FindAllUserInvitesQuery,
  FindAllWorkspaceInvitesQuery,
  RejectInviteInput,
} from './dto'
import { InvitesService } from './invites.service'

@UseGuards(AuthenticatedGuard)
@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get('/user')
  findAllUserInvites(
    @Query() query: FindAllUserInvitesQuery,
    @CurrentUser('id') userId: string,
  ) {
    return this.invitesService.findAllUserInvites(query, userId);
  }

  @Get('/workspace')
  findAllWorkspaceInvites(
    @Query() query: FindAllWorkspaceInvitesQuery,
    @CurrentUser('id') userId: string,
  ) {
    return this.invitesService.findAllWorkspaceInvites(query, userId);
  }

  @Post('/accept')
  accept(@Body() dto: AcceptInviteInput, @CurrentUser() user: User) {
    return this.invitesService.acceptMany(dto, user);
  }

  @Post('/reject')
  reject(@Body() dto: RejectInviteInput, @CurrentUser() user:User) {
    return this.invitesService.rejectMany(dto, user);
  }
}
