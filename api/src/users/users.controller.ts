import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard } from '@/shared/guards';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdatePasswordInput, UpdateUserInput } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/current')
  @UseGuards(AuthenticatedGuard)
  current(@CurrentUser() user: User) {
    return user;
  }

  @Patch('/current')
  @UseGuards(AuthenticatedGuard)
  update(@Body() dto: UpdateUserInput, @CurrentUser() user: User) {
    return this.usersService.update(dto, user);
  }

  @Patch('/current/password')
  @UseGuards(AuthenticatedGuard)
  updatePassword(
    @Body() dto: UpdatePasswordInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.usersService.updatePassword(dto, userId);
  }
}
