import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { FindAllMembersInput } from './dto';
import { MemberType, Prisma } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(query: FindAllMembersInput, userId: string) {
    const { type, take, searchValue, cursor, identifier, withUser } = query;

    let whereCondition: Prisma.MemberWhereInput;

    switch (type) {
      case MemberType.WORKSPACE: {
        whereCondition = {
          workspace: {
            slug: identifier,
            members: {
              some: {
                userId,
              },
            },
          },
        };

        break;
      }
      default: {
        whereCondition = {};
      }
    }

    if (!withUser) {
      whereCondition = {
        ...whereCondition,
        NOT: {
          user: {
            id: userId,
          },
        },
      };
    }

    const limit = take ?? 10;

    const members = await this.prisma.member.findMany({
      where: {
        ...whereCondition,
        OR: [
          {
            user: {
              username: {
                contains: searchValue,
              },
            },
          },
          {
            user: {
              email: {
                contains: searchValue,
              },
            },
          },
        ],
      },
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      take: cursor ? limit + 1 : limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    let nextCursor: typeof cursor | undefined = undefined;

    if (members.length > limit) {
      const nextItem = members.pop();
      nextCursor = nextItem!.id;
    }

    return {
      members,
      nextCursor,
    };
  }
}
