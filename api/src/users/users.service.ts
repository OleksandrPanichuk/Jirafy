import { CloudinaryService } from '@app/cloudinary';
import { PrismaService } from '@app/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { omit } from 'lodash';
import { UpdateUserInput } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

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

  public async update(dto: UpdateUserInput, user: User) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: dto,
    });

    const coverImageChanged =
      dto.coverImage && dto.coverImage?.key !== user.coverImage?.key;
    const avatarRemoved = dto.avatar === null;
    const avatarChanged = dto.avatar && dto.avatar?.key !== user.avatar.key;

    if (coverImageChanged && user.coverImage) {
      await this.cloudinary.delete(user.coverImage?.key);
    }

    if ((avatarChanged || avatarRemoved) && user.avatar) {
      await this.cloudinary.delete(user.avatar.key);
    }

    return updatedUser;
  }
}
