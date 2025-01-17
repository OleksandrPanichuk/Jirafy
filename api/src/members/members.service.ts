import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { MemberType, Prisma } from '@prisma/client';
import {
  CreateProjectMemberInput,
  CreateWorkspaceMemberInput,
  FindAllMembersInput,
} from './dto';

const DEFAULT_TAKE_MEMBERS = 10;

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

    const limit = take ?? DEFAULT_TAKE_MEMBERS;

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

  public async createProjectMember(dto: CreateProjectMemberInput) {
    const { isLead, defaultAssignee, ...rest } = dto;
    const projectsCount = await this.prisma.project.count({
      where: {
        workspaceId: dto.workspaceId,
        members: {
          some: {
            userId: dto.userId,
          },
        },
      },
    });

    return await this.prisma.member.create({
      data: {
        ...rest,
        isLead: isLead ?? false,
        defaultAssignee: defaultAssignee ?? false,
        type: MemberType.PROJECT,
        projectOrder: projectsCount + 1,
      },
    });
  }

  public createWorkspaceMember(dto: CreateWorkspaceMemberInput) {
    return this.prisma.member.create({
      data: {
        role: dto.role,
        workspaceId: dto.workspaceId,
        isWorkspaceSelected: false,
        type: MemberType.WORKSPACE,
        userId: dto.userId,
      },
    });
  }
}
