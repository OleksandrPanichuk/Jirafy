import { MembersService } from '@/members/members.service';
import { MailerService } from '@app/mailer';
import { EmailTemplates } from '@app/mailer/mailer.constants';
import { PrismaService } from '@app/prisma';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import {
  ActivityType,
  InviteState,
  MemberRole,
  Prisma,
  User,
} from '@prisma/client';
import {
  AcceptInviteInput,
  CreateInviteInput,
  FindAllInvitesInput,
  RejectInviteInput,
} from './dto';

@Injectable()
export class InvitesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly membersService: MembersService,
  ) {}

  public async findAll(input: FindAllInvitesInput, currentUserId: string) {
    let whereCondition: Prisma.InvitesWhereInput;

    if (input.userId && input.userId !== currentUserId) {
      throw new ForbiddenException("You cannot view other user's invites");
    }

    if (input.userId) {
      whereCondition = {
        userId: input.userId,
      };
    } else {
      whereCondition = {
        OR: [
          {
            workspaceId: input.workspaceId,
            workspace: {
              members: {
                some: {
                  userId: currentUserId,
                },
              },
            },
          },
          {
            projectId: input.projectId,
            project: {
              members: {
                some: {
                  userId: currentUserId,
                },
              },
            },
          },
        ],
      };
    }

    return this.prisma.invites.findMany({
      where: whereCondition,
      include: input.userId
        ? { workspace: true, project: true }
        : { user: true },
    });
  }

  public async create(dto: CreateInviteInput, senderId: string) {
    const member = await this.prisma.member.findFirst({
      where: {
        userId: senderId,
        role: {
          in: [MemberRole.ADMIN, MemberRole.OWNER],
        },
        ...(dto.workspaceId
          ? { workspaceId: dto.workspaceId }
          : { projectId: dto.projectId }),
      },
    });

    if (!member) {
      throw new ForbiddenException(
        'You do not have permission to invite members',
      );
    }

    const userToInvite = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        participations: {
          where: {
            OR: [
              {
                workspaceId: dto.workspaceId,
              },
              {
                projectId: dto.projectId,
              },
            ],
          },
        },
      },
    });

    if (!userToInvite) {
      throw new WsException({
        status: 'error',
        message: 'User not found',
      });
    }

    if (userToInvite.participations.length) {
      throw new WsException({
        status: 'error',
        message: 'User is already a member of this workspace/project',
      });
    }

    const activeInvite = await this.prisma.invites.findFirst({
      where: {
        email: dto.email,
        workspaceId: dto.workspaceId,
        projectId: dto.projectId,
        state: InviteState.PENDING,
      },
    });

    if (activeInvite) {
      throw new WsException({
        status: 'error',
        message: 'Invite already sent',
      });
    }

    //TODO: Check for limits of members per project/workspace. If limits are reached, throw an error

    const invite = await this.prisma.invites.create({
      data: {
        ...dto,
        state: InviteState.PENDING,
        userId: userToInvite.id,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    let invitationPlace: string;

    if (dto.workspaceId) {
      invitationPlace = (
        await this.prisma.workspace.findUnique({
          where: {
            id: dto.workspaceId,
          },
          select: {
            name: true,
          },
        })
      ).name;
    } else {
      invitationPlace = (
        await this.prisma.project.findUnique({
          where: {
            id: dto.projectId,
          },
          select: {
            name: true,
          },
        })
      ).name;
    }

    await this.mailer.sendHTML(
      EmailTemplates.INVITATION,
      {
        to: dto.email,
        subject: 'You have been invited to join a workspace',
      },
      {
        name: userToInvite.firstName,
        invitationPlace,
      },
    );

    return invite;
  }

  // TODO: check for limits, if workspace/project is full and workspace without subscription then throw an error
  public async accept(dto: AcceptInviteInput, user: User) {
    const invite = await this.prisma.invites.findUnique({
      where: {
        id: dto.inviteId,
      },
      include: {
        project: true,
      },
    });

    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    if (invite.state !== InviteState.PENDING) {
      throw new ForbiddenException('Invite is no longer valid');
    }

    const updatedInvite = await this.prisma.invites.update({
      where: {
        id: dto.inviteId,
      },
      data: {
        state: InviteState.ACCEPTED,
      },
    });

    if (invite.workspaceId) {
      await this.membersService.createWorkspaceMember({
        role: invite.role,
        userId: user.id,
        workspaceId: invite.workspaceId,
      });
    } else {
      await this.membersService.createProjectMember({
        projectId: invite.projectId,
        role: invite.role,
        userId: user.id,
        workspaceId: invite.workspaceId,
      });
    }

    // TODO: separate into activities service
    await this.prisma.activity.create({
      data: {
        type: invite.workspaceId
          ? ActivityType.JOIN_WORKSPACE
          : ActivityType.JOIN_PROJECT,
        workspaceId: invite.workspaceId,
        projectId: invite.projectId,
        userId: user.id,
        data: `**${user.username}** joined the ${invite.workspaceId ? 'workspace' : invite.project.name + ' project'}.`,
      },
    });

    return updatedInvite;
  }

  public async reject(dto: RejectInviteInput, user: User) {
    const invite = await this.prisma.invites.findUnique({
      where: {
        id: dto.inviteId,
      },
      include: {
        project: true,
      },
    });

    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    if (invite.state !== InviteState.PENDING) {
      throw new ForbiddenException('Invite is no longer valid');
    }

    const updatedInvite = await this.prisma.invites.update({
      where: {
        id: dto.inviteId,
      },
      data: {
        state: InviteState.REJECTED,
      },
    });

    await this.prisma.activity.create({
      data: {
        type: invite.workspaceId
          ? ActivityType.JOIN_WORKSPACE
          : ActivityType.JOIN_PROJECT,
        workspaceId: invite.workspaceId,
        projectId: invite.projectId,
        userId: user.id,
        data: `**${user.username}** rejected the ${invite.workspaceId ? 'workspace invite' : invite.project.name + ' project invite'}.`,
      },
    });

    return updatedInvite;
  }
}
