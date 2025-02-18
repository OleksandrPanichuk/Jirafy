import { CloudinaryService } from '@app/cloudinary';
import { PrismaService } from '@app/prisma';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { UpdatePasswordInput, UpdateUserInput } from './dto';

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

  public async updatePassword(dto: UpdatePasswordInput, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })!;

    const isMatch = await bcrypt.compare(dto.currentPassword, user.hash);

    if (!isMatch) {
      throw new ForbiddenException("Current password doesn't match", {
        description: 'user/wrong-password',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.newPassword, salt);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { hash },
    });

    return 'Password changed successfully';
  }
}
