import { PrismaService } from '@app/prisma';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MemberRole, MemberType } from '@prisma/client';
import { CreateWorkspaceInput, SelectWorkspaceInput } from './dto';

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
            id: true,
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

  public async selectWorkspace(dto: SelectWorkspaceInput, userId: string) {
    const { workspaceId } = dto;

    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        members: {
          where: {
            userId,
          },
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    if (!workspace.members.length) {
      throw new NotFoundException('User is not a member of this workspace');
    }

    await this.prisma.member.updateMany({
      where: {
        userId,
        type: MemberType.WORKSPACE,
        NOT: {
          workspaceId,
        },
      },
      data: {
        isWorkspaceSelected: false,
      },
    });

    await this.prisma.member.updateMany({
      where: {
        userId,
        workspaceId,
        type: MemberType.WORKSPACE,
      },
      data: {
        isWorkspaceSelected: true,
      },
    });

    return { success: true };
  }
}
