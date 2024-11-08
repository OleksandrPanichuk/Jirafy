import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { FindAllMembersInput } from './dto'

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(input: FindAllMembersInput, userId: string) {
    const { slug, take, searchValue, cursor } = input;

    const limit = take ?? 10;

    const members = await this.prisma.member.findMany({
      where: {
        workspace: {
          slug,
          members: {
            some: {
              userId,
            },
          },
        },
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
