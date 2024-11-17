import { PrismaService } from '@app/prisma';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddToFavoritesInput } from './dto';
import { RemoveFromFavoritesInput } from './dto/remove-from-favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(slug: string, userId: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { slug },
    });
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const member = await this.prisma.member.findFirst({
      where: {
        workspaceId: workspace.id,
        userId,
      },
    });

    if (!member) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    return this.prisma.favorites.findMany({
      where: {
        memberId: member.id,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            emoji: true,
          },
        },
      },
    });
  }

  public async add(dto: AddToFavoritesInput, userId: string) {
    const member = await this.prisma.member.findUnique({
      where: {
        id: dto.memberId,
      },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.userId !== userId) {
      throw new ForbiddenException('You are not allowed to add favorites');
    }

    return this.prisma.favorites.create({
      data: dto,
    });
  }

  public async remove(dto: RemoveFromFavoritesInput, userId: string) {
    const member = await this.prisma.member.findUnique({
      where: {
        id: dto.memberId,
      },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.userId !== userId) {
      throw new ForbiddenException('You are not allowed to remove favorites');
    }

    const favorite = await this.prisma.favorites.findUnique({
      where: {
        id: dto.favoriteId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    return this.prisma.favorites.delete({
      where: {
        id: dto.favoriteId,
      },
    });
  }
}
