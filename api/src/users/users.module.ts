import { CloudinaryModule } from '@app/cloudinary'
import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  imports:[CloudinaryModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
