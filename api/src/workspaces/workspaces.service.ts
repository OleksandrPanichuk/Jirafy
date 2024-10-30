import { PrismaService } from '@app/prisma';
import { ConflictException, Injectable } from '@nestjs/common';
import { MemberRole, MemberType } from '@prisma/client';
import { CreateWorkspaceInput } from './dto';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(userId: string) {
    return await this.prisma.workspace.findMany({
      where: {
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
            role: true,
            isLead: true,
            defaultAssignee: true,
            isWorkspaceSelected: true,
          },
        },
      },
    });
  }

  public async create(dto: CreateWorkspaceInput, userId: string) {
    const { slug, name, size } = dto;
    const existingWorkspace = await this.prisma.workspace.findUnique({
      where: {
        slug,
      },
    });

    if (existingWorkspace) {
      throw new ConflictException('Workspace url already in use');
    }

    const workspace = await this.prisma.workspace.create({
      data: {
        slug,
        name,
        size,
      },
    });

    await this.prisma.member.create({
      data: {
        userId,
        workspaceId: workspace.id,
        role: MemberRole.OWNER,
        isLead: true,
        defaultAssignee: true,
        isWorkspaceSelected: true,
        type: MemberType.WORKSPACE,
      },
    });

    await this.prisma.member.updateMany({
      where: {
        userId,
        type: MemberType.WORKSPACE,
        workspaceId: {
          not: workspace.id,
        },
      },
      data: {
        isWorkspaceSelected: false,
      },
    });

    return workspace;
  }

  public async selectWorkspace() {}
}
