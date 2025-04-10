import { MembersService } from '@/members/members.service';
import { PrismaService } from '@app/prisma';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MemberRole, User } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly membersService: MembersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(
      'roles',
      context.getHandler(),
    ) as MemberRole[];


    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const params = request.params;
    const body = request.body;


    if (!params?.workspaceId && !params?.slug && !body?.workspaceId) {
      return true;
    }

    const workspaceId = params?.workspaceId || body?.workspaceId;

    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
        slug: params?.slug,
      },
    });

    const user = request.user as User;

    if (!workspace) {
      return false;
    }

    return await this.membersService.validateWorkspaceMember(
      workspace.id,
      user?.id,
      roles,
    );
  }
}
