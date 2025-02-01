import { CloudinaryModule } from '@app/cloudinary';
import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  imports: [CloudinaryModule],
})
export class WorkspacesModule {}
