import { PrismaService } from '@app/prisma';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MemberRole, MemberType, Network, Prisma } from '@prisma/client';
import {
  CreateProjectInput,
  JoinProjectInput,
  ReorderProjectInput,
} from './dto';
import { FindAllProjectsWithFiltersInput } from './dto/find-all-projects-with-filters.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllByWorkspaceSlug(slug: string, userId: string) {
    return this.prisma.project.findMany({
      where: {
        workspace: {
          slug,
        },
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          where: {
            userId,
            type: MemberType.PROJECT,
          },
          select: {
            projectOrder: true,
            isLead: true,
            defaultAssignee: true,
            role: true,
          },
        },
      },
    });
  }

  public async findAllByWorkspaceSlugWithFilters(
    dto: FindAllProjectsWithFiltersInput,
    slug: string,
    userId: string,
  ) {
    const {
      leadersIds,
      network,
      onlyMyProjects,
      searchValue,
      sortBy,
      sortOrder,
      takeMembers,
    } = dto;

    let orderBy: Prisma.ProjectOrderByWithRelationInput;

    switch (sortBy) {
      case 'name': {
        orderBy = {
          name: sortOrder,
        };
        break;
      }
      case 'createdAt': {
        orderBy = {
          createdAt: sortOrder,
        };
        break;
      }
      case 'membersCount': {
        orderBy = {
          members: {
            _count: sortOrder,
          },
        };
        break;
      }

      default: {
        orderBy = {};
        break;
      }
    }

    const member = await this.prisma.member.findFirst({
      where: {
        userId,
        workspace: {
          slug,
        },
      },
    });

    const hasAccess =
      member.role === MemberRole.ADMIN || member.role === MemberRole.OWNER;

    return this.prisma.project.findMany({
      where: {
        ...(network?.length &&
          hasAccess && {
            network: {
              in: network,
            },
          }),

        ...(!hasAccess && {
          OR: [
            {
              ...(!network?.includes(Network.PRIVATE) && {
                network: Network.PUBLIC,
              }),
            },
            {
              members: {
                some: {
                  userId,
                },
              },
              ...(network?.length && {
                network: {
                  in: network,
                },
              }),
            },
          ],
        }),

        workspace: {
          slug,
        },
        createdAt: {
          lte: dto.beforeDate,
          gte: dto.afterDate,
        },

        ...(searchValue && {
          name: {
            mode: 'insensitive',
            contains: searchValue,
          },
        }),

        ...(onlyMyProjects && {
          members: {
            some: {
              userId,
              role: MemberRole.OWNER,
            },
          },
        }),

        ...(leadersIds?.length > 0 &&
          !onlyMyProjects && {
            members: {
              some: {
                isLead: true,
                id: {
                  in: leadersIds,
                },
              },
            },
          }),
      },
      include: {
        _count: {
          select: {
            members: true,
          },
        },
        members: {
          where: {
            type: MemberType.PROJECT,
          },
          select: {
            id: true,
            user: {
              select: {
                id: true,
                avatar: true,
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          take: takeMembers,
        },
      },
      orderBy,
    });
  }

  public async create(dto: CreateProjectInput, userId: string) {
    const existingProject = await this.prisma.project.findFirst({
      where: {
        identifier: dto.identifier,
        workspaceId: dto.workspaceId,
      },
    });

    if (existingProject) {
      throw new ConflictException(
        'Project with this identifier already exists',
      );
    }

    const currentMember = await this.prisma.member.findFirst({
      where: {
        userId,
        workspaceId: dto.workspaceId,
      },
    });

    if (!currentMember) {
      throw new ForbiddenException(
        'You do not have permission to create projects in this workspace',
      );
    }

    const { leadId, ...data } = dto;

    const project = await this.prisma.project.create({
      data,
    });

    if (leadId && leadId !== userId) {
      await this.createMember(
        dto.workspaceId,
        userId,
        project.id,
        MemberRole.OWNER,
      );
      await this.createMember(
        dto.workspaceId,
        leadId,
        project.id,
        MemberRole.ADMIN,
        true,
      );
    } else {
      await this.createMember(
        dto.workspaceId,
        userId,
        project.id,
        MemberRole.OWNER,
        true,
      );
    }

    return project;
  }

  public async join(dto: JoinProjectInput, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: dto.projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project to join not found');
    }

    const currentWorkspaceMember = await this.prisma.member.findFirst({
      where: {
        userId,
        workspaceId: project.workspaceId,
      },
    });

    const hasAccess =
      currentWorkspaceMember.role === MemberRole.ADMIN ||
      currentWorkspaceMember.role === MemberRole.OWNER;

    if (project.network === Network.PRIVATE && !hasAccess) {
      throw new ForbiddenException(
        'You do not have permission to join this project',
      );
    }

    const member = await this.createMember(
      project.workspaceId,
      userId,
      project.id,
      hasAccess ? MemberRole.ADMIN : MemberRole.MEMBER,
    );

    return {
      ...project,
      members: [member],
    };
  }

  public async reorder(dto: ReorderProjectInput, userId: string) {
    const currentMember = await this.prisma.member.findFirst({
      where: {
        userId,
        workspaceId: dto.workspaceId,
      },
    });

    if (!currentMember) {
      throw new ForbiddenException(
        'You do not have permission to reorder projects in this workspace',
      );
    }

    const projects = await this.prisma.project.findMany({
      where: {
        workspaceId: dto.workspaceId,
        members: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const projectIds = projects.map((project) => project.id);

    const reorderedProjects = dto.data.map((data) => ({
      id: data.projectId,
      order: data.order,
    }));

    const reorderedProjectIds = reorderedProjects.map((project) => project.id);

    if (projectIds.length !== reorderedProjectIds.length) {
      throw new ConflictException('Invalid project count');
    }

    const isInvalid = reorderedProjectIds.some(
      (projectId) => !projectIds.includes(projectId),
    );

    if (isInvalid) {
      throw new ConflictException(
        'You are not a member of some projects in the list',
      );
    }

    for (const el of reorderedProjects) {
      await this.prisma.member.updateMany({
        where: {
          projectId: el.id,
          userId,
          type: MemberType.PROJECT,
        },
        data: {
          projectOrder: el.order,
        },
      });
    }
  }

  private async createMember(
    workspaceId: string,
    userId: string,
    projectId: string,
    role: MemberRole,
    isLead: boolean = false,
  ) {
    const projectsCount = await this.prisma.project.count({
      where: {
        workspaceId,
        members: {
          some: {
            userId,
          },
        },
      },
    });

    await this.prisma.member.create({
      data: {
        userId,
        role,
        type: MemberType.PROJECT,
        projectId,
        isLead,
        projectOrder: projectsCount + 1,
      },
    });
  }
}
