import {
  CreateChannelInput,
  CreateChannelsGroupInput,
  UpdateChannelInput,
  UpdateChannelsGroupInput,
} from '@/channels/dto';
import { CurrentUser, Roles } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MemberRole } from '@prisma/client';
import { ChannelsService } from './channels.service';

@UseGuards(AuthenticatedGuard)
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get('/by-workspace-slug/:slug')
  public findAll(
    @Param('slug') slug: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.channelsService.findAll(slug, userId);
  }

  @Get('/by-workspace-slug/:slug/:name')
  public findByName(
    @Param('slug') slug: string,
    @Param('name') name: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.channelsService.findByName(slug, name, userId);
  }

  @Roles(MemberRole.ADMIN, MemberRole.OWNER)
  @Post('/')
  public create(@Body() dto: CreateChannelInput) {
    return this.channelsService.create(dto);
  }


  @Roles(MemberRole.ADMIN, MemberRole.OWNER)
  @Post('/groups')
  public createGroup(
    @Body() dto: CreateChannelsGroupInput,
  ) {
    return this.channelsService.createGroup(dto);
  }

  @Roles(MemberRole.ADMIN, MemberRole.OWNER)
  @Patch('/:channelId')
  public async update(
    @Param('channelId') channelId: string,
    @Body() dto: UpdateChannelInput,
  ) {
    return this.channelsService.update(channelId, dto);
  }

  @Patch('/groups/:groupId')
  public updateGroup(
    @Param('groupId') groupId: string,
    @Body() dto: UpdateChannelsGroupInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.channelsService.updateGroup(groupId, dto, userId);
  }

  @Delete('/groups/:groupId')
  public deleteGroup(
    @Param('groupId') groupId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.channelsService.deleteGroup(groupId, userId);
  }

  @Delete('/:channelId')
  public delete(
    @Param('channelId') channelId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.channelsService.delete(channelId, userId);
  }
}
