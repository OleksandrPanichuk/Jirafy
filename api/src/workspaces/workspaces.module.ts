import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { CloudinaryModule } from '@app/cloudinary'

@Module({
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  imports: [CloudinaryModule]
})
export class WorkspacesModule {}
