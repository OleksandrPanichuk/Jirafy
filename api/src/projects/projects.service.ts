import { PrismaService } from '@app/prisma';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MemberRole } from '@prisma/client';
import { CreateProjectInput } from './dto';

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

    if (dto.leadId !== userId) {
      await this.createFirstMember(dto.workspaceId, userId, project.id);
    }
    await this.createFirstMember(dto.workspaceId, leadId ?? userId, project.id);

    return project;
  }

  private async createFirstMember(
    workspaceId: string,
    userId: string,
    projectId: string,
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
        projectId,
        projectOrder: projectsCount + 1,
      },
    });
  }
}
