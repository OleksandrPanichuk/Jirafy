import { PrismaService } from '@app/prisma';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { extractSession } from '../helpers';

@Injectable()
export class WsAuthenticatedGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ws = context.switchToWs();
    const client = ws.getClient<Socket>();

    const sessionId = extractSession(client.handshake.headers.cookie);

    if (!sessionId) {
      return false;
    }

    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    return !!session;
  }
}
