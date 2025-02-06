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
import { ActivityType, InviteState, MemberRole, User } from '@prisma/client';
import {
  AcceptInviteInput,
  CreateInviteInput,
  FindAllUserInvitesQuery,
  FindAllWorkspaceInvitesQuery,
  RejectInviteInput,
} from './dto';

@Injectable()
export class InvitesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly membersService: MembersService,
  ) {}

  public async findAllUserInvites(
    dto: FindAllUserInvitesQuery,
    userId: string,
  ) {
    return this.prisma.invites.findMany({
      where: {
        userId,
        state: dto.state,
      },
      include: {
        workspace: true,
      },
    });
  }

  public async findAllWorkspaceInvites(
    dto: FindAllWorkspaceInvitesQuery,
    userId: string,
  ) {
    return this.prisma.invites.findMany({
      where: {
        workspaceId: dto.workspaceId,
        workspace: {
          members: {
            some: {
              userId,
            },
          },
        },
        state: dto.state,
      },
      include: {
        user: true,
      },
    });
  }

  public async create(dto: CreateInviteInput, senderId: string) {
    const member = await this.prisma.member.findFirst({
      where: {
        userId: senderId,
        role: {
          in: [MemberRole.ADMIN, MemberRole.OWNER],
        },
        workspaceId: dto.workspaceId,
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
            workspaceId: dto.workspaceId,
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
        state: InviteState.PENDING,
      },
    });

    if (activeInvite) {
      throw new WsException({
        status: 'error',
        message: 'Invite already sent',
      });
    }

    //TODO: Check for limits of members per workspace. If limits are reached, throw an error

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
        workspace: true,
      },
    });

    const invitationPlace: string = (
      await this.prisma.workspace.findUnique({
        where: {
          id: dto.workspaceId,
        },
        select: {
          name: true,
        },
      })
    ).name;

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

  // Batch accept
  public async acceptMany(dto: AcceptInviteInput, user: User) {
    return await Promise.all(
      dto.invites.map(async (inviteId) => {
        return this.acceptById(inviteId, user);
      }),
    );
  }

  public async rejectMany(dto:RejectInviteInput, user:User) {
    return await Promise.all(
      dto.invites.map(async (inviteId) => {
        return this.rejectById(inviteId, user);
      }),
    );
  }

  // TODO: check for limits, if workspace is full and workspace without subscription then throw an error
  private async acceptById(inviteId: string, user: User) {
    const invite = await this.prisma.invites.findUnique({
      where: {
        id: inviteId,
        userId: user.id,
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
        id: inviteId,
      },
      data: {
        state: InviteState.ACCEPTED,
      },
    });

    await this.membersService.createWorkspaceMember({
      role: invite.role,
      userId: user.id,
      workspaceId: invite.workspaceId,
    });

    // TODO: separate into activities service
    await this.prisma.activity.create({
      data: {
        type: invite.workspaceId
          ? ActivityType.JOIN_WORKSPACE
          : ActivityType.JOIN_PROJECT,
        workspaceId: invite.workspaceId,
        data: `**${user.username}** joined the workspace.`,
        userId:user.id,
      },
    });

    return updatedInvite;
  }

  private async rejectById(inviteId: string, user:User) {
    const invite = await this.prisma.invites.findUnique({
      where: {
        id: inviteId,
        userId: user.id,
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
        id: inviteId,
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
        data: `**${user.username}** rejected the workspace invite.`,
        userId: user.id,
      },
    });

    return updatedInvite;
  }
}
