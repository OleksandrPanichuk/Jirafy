import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/current')
  @UseGuards(AuthenticatedGuard)
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
