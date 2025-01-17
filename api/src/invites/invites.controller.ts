import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  AcceptInviteInput,
  FindAllInvitesInput,
  RejectInviteInput,
} from './dto';
import { InvitesService } from './invites.service';

@UseGuards(AuthenticatedGuard)
@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get()
  findAll(@Body() dto: FindAllInvitesInput, @CurrentUser('id') userId: string) {
    return this.invitesService.findAll(dto, userId);
  }

  @Post('/accept')
  accept(@Body() dto: AcceptInviteInput, @CurrentUser() user: User) {
    return this.invitesService.accept(dto, user);
  }

  @Post('/reject')
  reject(@Body() dto: RejectInviteInput, @CurrentUser() user: User) {
    return this.invitesService.reject(dto, user);
  }
}
