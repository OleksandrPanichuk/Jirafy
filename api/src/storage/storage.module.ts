import { CloudinaryModule } from '@app/cloudinary';
import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
