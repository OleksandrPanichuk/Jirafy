import {
  CreateChannelInput,
  CreateChannelsGroupInput,
  UpdateChannelInput,
  UpdateChannelsGroupInput,
} from '@/channels/dto';
import { MembersService } from '@/members/members.service';
import { DEFAULT_CHANNEL_NAME } from '@/shared/constants';
import { WorkspacesService } from '@/workspaces/workspaces.service';
import { PrismaService } from '@app/prisma';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MemberRole } from '@prisma/client';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspacesService: WorkspacesService,
    private readonly membersService: MembersService,
  ) {}

  public async findByName(workspaceSlug: string, name: string, userId: string) {
    const workspace = await this.workspacesService.findBySlug(workspaceSlug);
    if (
      !(await this.membersService.validateWorkspaceMember(workspace.id, userId))
    ) {
      throw new ForbiddenException('You are not a member of this workspace');
    }
    const channel = await this.prisma.channel.findFirst({
      where: {
        workspaceId: workspace.id,
        name,
      },
    });
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    return channel;
  }

  public async findAll(workspaceSlug: string, userId: string) {
    const workspace = await this.workspacesService.findBySlug(workspaceSlug);

    if (
      !(await this.membersService.validateWorkspaceMember(workspace.id, userId))
    ) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    return this.prisma.channelsGroup.findMany({
      where: {
        workspaceId: workspace.id,
      },
      include: {
        channels: true,
      },
    });
  }

  public async createGroup(dto: CreateChannelsGroupInput) {
    return this.prisma.channelsGroup.create({
      data: {
        name: dto.name,
        workspaceId: dto.workspaceId,
      },
    });
  }
  public async create(dto: CreateChannelInput) {
    const group = await this.prisma.channelsGroup.findUnique({
      where: {
        id: dto.groupId,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const existingChannel = await this.prisma.channel.findFirst({
      where: {
        groupId: group.id,
        name: dto.name,
        type: dto.type,
      },
    });

    if (existingChannel) {
      throw new ConflictException(
        'Channel with this name already exists in group',
      );
    }

    return this.prisma.channel.create({
      data: dto,
    });
  }

  public async update(channelId: string, dto: UpdateChannelInput) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    if (channel.name === DEFAULT_CHANNEL_NAME) {
      throw new BadRequestException('You cannot change the default channel');
    }

    const existingChannel = await this.prisma.channel.findFirst({
      where: {
        groupId: channel.groupId,
        name: dto.name,
        type: dto.type,
        id: {
          not: channelId,
        },
      },
    });

    if (existingChannel) {
      throw new ConflictException(
        'Channel with this name already exists in group',
      );
    }

    if (channel.type !== dto.type) {
      const messages = await this.prisma.message.findMany({
        take: 1,
        where: {
          channelId: channelId,
        },
      });

      if (messages.length > 0) {
        throw new ConflictException(
          'You cannot change channel type after messages have been sent',
        );
      }
    }

    return this.prisma.channel.update({
      where: {
        id: channelId,
      },
      data: dto,
    });
  }

  public async delete(channelId: string, userId: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
        workspace: {
          members: {
            some: {
              userId,
              role: {
                in: [MemberRole.ADMIN, MemberRole.OWNER],
              },
            },
          },
        },
      },
    });
    if (!channel) {
      throw new ForbiddenException('Channel not found');
    }

    if (channel.name === DEFAULT_CHANNEL_NAME) {
      throw new BadRequestException('You cannot delete the default channel');
    }

    return this.prisma.channel.delete({
      where: {
        id: channelId,
      },
    });
  }

  public async deleteGroup(groupId: string, userId: string) {
    const group = await this.prisma.channelsGroup.findUnique({
      where: {
        id: groupId,
        workspace: {
          members: {
            some: {
              userId,
              role: {
                in: [MemberRole.ADMIN, MemberRole.OWNER],
              },
            },
          },
        },
      },
      select: {
        id: true,
        _count: {
          select: {
            channels: true,
          },
        },
      },
    });

    if (!group) {
      throw new ForbiddenException('Group not found');
    }

    if (group._count.channels > 0) {
      throw new ForbiddenException(
        'You need to delete all channels in this group first',
      );
    }

    return this.prisma.channelsGroup.delete({
      where: {
        id: groupId,
      },
    });
  }

  public async updateGroup(
    groupId: string,
    dto: UpdateChannelsGroupInput,
    userId: string,
  ) {
    const group = await this.prisma.channelsGroup.findUnique({
      where: {
        id: groupId,
        workspace: {
          members: {
            some: {
              userId,
              role: {
                in: [MemberRole.ADMIN, MemberRole.OWNER],
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new ForbiddenException('Group not found');
    }

    return this.prisma.channelsGroup.update({
      where: {
        id: groupId,
      },
      data: dto,
    });
  }
}
