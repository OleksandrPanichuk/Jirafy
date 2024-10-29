import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '@/common/guards';
import { CurrentUser } from '@/common/decorators';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/current')
  @UseGuards(AuthenticatedGuard)
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
