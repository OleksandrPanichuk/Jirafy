import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { FindAllMembersQuery } from './dto'
import { MemberType, Prisma } from '@prisma/client'

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(query: FindAllMembersQuery, identifier:string, userId: string) {
    const { type, take, searchValue, cursor } = query;

    let whereCondition: Prisma.MemberWhereInput;

    switch(type) {
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
        }

        break
      }
      default: {
        whereCondition = {}
      }
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

        NOT: {
          user: {
            id: userId,
          },
        },
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
