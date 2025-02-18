import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserInput } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/current')
  @UseGuards(AuthenticatedGuard)
  current(@CurrentUser() user: User) {
    return user;
  }

  @Put('/current')
  @UseGuards(AuthenticatedGuard)
  update(@Body() dto: UpdateUserInput, @CurrentUser() user: User) {
    return this.usersService.update(dto, user)
  }
}
