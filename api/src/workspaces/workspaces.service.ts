import { CloudinaryService } from '@app/cloudinary';
import { PrismaService } from '@app/prisma';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActivityType, MemberRole, MemberType, User } from '@prisma/client';
import {
  CreateWorkspaceInput,
  SelectWorkspaceInput,
  UpdateWorkspaceInput,
} from './dto';

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: CloudinaryService,
  ) {}

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

    const member = await this.prisma.member.create({
      data: {
        userId,
        workspaceId: workspace.id,
        role: MemberRole.OWNER,
        isWorkspaceSelected: true,
        type: MemberType.WORKSPACE,
      },
      select: {
        id: true,
        role: true,
        isWorkspaceSelected: true,
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

    return { ...workspace, members: [member] };
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

  public async update(
    workspaceId: string,
    dto: UpdateWorkspaceInput,
    user: User,
  ) {
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        members: {
          where: {
            userId: user.id,
          },
        },
      },
    });

    if (!workspace || !workspace.members.length) {
      throw new NotFoundException('Workspace not found');
    }

    const member = workspace.members[0];

    if (member.role !== MemberRole.OWNER && member.role !== MemberRole.ADMIN) {
      throw new ForbiddenException(
        'You are not allowed to update this workspace',
      );
    }

    
    const updated = await this.prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: dto,
    });
    
    await this.prisma.activity.create({
      data: {
        type: ActivityType.UPDATE_WORKSPACE,
        userId: user.id,
        data: `**${user.username}** updated workspace.`,
      },
    });

    if (dto.logo && workspace.logo?.key) {
      await this.storage.delete(workspace.logo.key);
    }

    return updated;
  }

  public async delete(workspaceId: string, userId: string) {
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

    if (!workspace || !workspace.members.length) {
      throw new NotFoundException('Workspace not found');
    }

    const member = workspace.members[0];

    if (member.role !== MemberRole.OWNER && member.role !== MemberRole.ADMIN) {
      throw new ForbiddenException(
        'You are not allowed to delete this workspace',
      );
    }

    const projects = await this.prisma.project.findMany({
      where: {
        workspaceId,
      },
    });

    const documents = await this.prisma.document.findMany({
      where: {
        project: {
          workspaceId,
        },
      },
    });

    await this.prisma.$transaction([
      this.prisma.project.deleteMany({
        where: {
          workspaceId,
        },
      }),
      this.prisma.document.deleteMany({
        where: {
          project: {
            workspaceId,
          },
        },
      }),
      this.prisma.workspace.delete({
        where: {
          id: workspaceId,
        },
      }),
      this.prisma.member.deleteMany({
        where: {
          workspaceId,
          type: MemberType.WORKSPACE,
        },
      }),
      this.prisma.invites.deleteMany({
        where: {
          workspaceId,
        },
      }),
      this.prisma.member.deleteMany({
        where: {
          project: {
            workspaceId,
          },
        },
      }),
      this.prisma.conversation.deleteMany({
        where: {
          workspaceId,
        },
      }),
      this.prisma.channel.deleteMany({
        where: {
          workspaceId,
        },
      }),
      this.prisma.message.deleteMany({
        where: {
          OR: [
            {
              conversation: {
                workspaceId,
              },
            },
            {
              channel: {
                workspaceId,
              },
            },
          ],
        },
      }),
      this.prisma.activity.deleteMany({
        where: {
          OR: [
            {
              workspaceId,
            },
            {
              project: {
                workspaceId,
              },
            },
          ],
        },
      }),
      this.prisma.comment.deleteMany({
        where: {
          issue: {
            project: {
              workspaceId,
            },
          },
        },
      }),
      this.prisma.mention.deleteMany({
        where: {
          document: {
            project: {
              workspaceId,
            },
          },
        },
      }),
      this.prisma.issue.deleteMany({
        where: {
          project: {
            workspaceId,
          },
        },
      }),
      this.prisma.favorites.deleteMany({
        where: {
          project: {
            workspaceId,
          },
        },
      }),
      this.prisma.cycle.deleteMany({
        where: {
          project: {
            workspaceId,
          },
        },
      }),
    ]);

    await Promise.all([
      () => workspace.logo?.key && this.storage.delete(workspace.logo.key),
      projects.flatMap(
        (project) =>
          project.cover.key && this.storage.delete(project.cover.key),
      ),
      documents.flatMap(
        (document) =>
          document.coverImage.key &&
          this.storage.delete(document.coverImage.key),
      ),
    ]);

    return workspace;
  }
}
