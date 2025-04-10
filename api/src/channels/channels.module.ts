import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { WorkspacesModule } from '@/workspaces/workspaces.module';
import { MembersModule } from '@/members/members.module';

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService],
  imports: [WorkspacesModule, MembersModule],
})
export class ChannelsModule {}
