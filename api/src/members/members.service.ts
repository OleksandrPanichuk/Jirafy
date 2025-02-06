import { UpdateMemberRoleInput } from '@/members/dto/update-member.dto';
import { PrismaService } from '@app/prisma';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MemberRole, MemberType, Prisma } from '@prisma/client';
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

  public async updateRole(
    dto: UpdateMemberRoleInput,
    memberId: string,
    userId: string,
  ) {
    const member = await this.prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.userId === userId && dto.role) {
      throw new ForbiddenException("You can't update your own role");
    }

    const updater = await this.prisma.member.findFirst({
      where: {
        userId,
        role: {
          in: [MemberRole.ADMIN, MemberRole.OWNER],
        },
        OR: [
          {
            workspaceId: member.workspaceId,
          },
          {
            projectId: member.projectId,
          },
        ],
      },
    });

    if (!updater) {
      throw new ForbiddenException(
        "You don't have permission to update this member",
      );
    }

    return this.prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        role: dto.role,
      },
    });
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

    return this.prisma.member.create({
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

  public async delete(memberId: string, userId: string) {
    const member = await this.prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.userId === userId) {
      throw new ForbiddenException("You can't delete yourself");
    }

    if (member.role === MemberRole.OWNER) {
      throw new ForbiddenException(
        "You can't delete the owner of the workspace or project",
      );
    }

    const deleter = await this.prisma.member.findFirst({
      where: {
        userId,
        role: {
          in: [MemberRole.ADMIN, MemberRole.OWNER],
        },
        OR: [
          {
            workspaceId: member.workspaceId,
          },
          {
            projectId: member.projectId,
          },
        ],
      },
    });

    if (!deleter) {
      throw new ForbiddenException(
        "You don't have permission to delete this member",
      );
    }

    if (member.role === MemberRole.ADMIN && deleter.role !== MemberRole.OWNER) {
      throw new ForbiddenException(
        "You can't delete an admin of the workspace or project",
      );
    }

    return await this.prisma.member.delete({
      where: {
        id: memberId,
      },
    });
  }
}
