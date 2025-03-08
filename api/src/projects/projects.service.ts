import { PrismaService } from '@app/prisma';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MemberRole, MemberType, Prisma } from '@prisma/client';
import { CreateProjectInput, ReorderProjectInput } from './dto';
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

    return this.prisma.project.findMany({
      where: {
        ...(network?.length && {
          network: {
            in: network,
          },
        }),

        workspace: {
          slug,
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

    const role = currentMember.role as MemberRole;

    if (role !== MemberRole.ADMIN && role !== MemberRole.OWNER) {
      throw new ForbiddenException(
        'You do not have permission to create projects in this workspace',
      );
    }

    const { leadId, ...data } = dto;

    const project = await this.prisma.project.create({
      data,
    });

    if (leadId && leadId !== userId) {
      await this.createFirstMember(dto.workspaceId, userId, project.id);
    }
    await this.createFirstMember(
      dto.workspaceId,
      leadId ?? userId,
      project.id,
      true,
    );

    return project;
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

  private async createFirstMember(
    workspaceId: string,
    userId: string,
    projectId: string,
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
        role: MemberRole.ADMIN,
        type: MemberType.PROJECT,
        projectId,
        isLead,
        projectOrder: projectsCount + 1,
      },
    });
  }
}
