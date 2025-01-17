import { PrismaService } from '@app/prisma';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MemberRole, MemberType } from '@prisma/client';
import { CreateProjectInput, ReorderProjectInput } from './dto';

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
