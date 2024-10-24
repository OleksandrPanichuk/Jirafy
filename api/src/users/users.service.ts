import { PrismaService } from '@app/prisma'
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { omit } from 'lodash'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	
  public async findById(userId: string): Promise<Omit<User, 'hash'>> {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user)
        throw new NotFoundException('User not found', {
          description: 'user/user-not-found',
        });

      return omit(user, 'hash');
  }
}
