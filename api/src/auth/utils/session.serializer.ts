import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(
    user: Omit<User, 'hash'>,
    done: (err: unknown, userId: string) => void,
  ) {
    try {
      done(null, user.id);
    } catch (err) {
      done(err, null);
    }
  }

  async deserializeUser(
    userId: string,
    done: (err: unknown, user: Omit<User, 'hash'>) => void,
  ) {
    try {
      const user = await this.userService.findById(userId);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
