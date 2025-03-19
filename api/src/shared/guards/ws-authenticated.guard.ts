import { PrismaService } from '@app/prisma';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { extractSession, Redis } from '../helpers';
import { Redis as TypeRedis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsAuthenticatedGuard implements CanActivate {
  private readonly redis: TypeRedis;
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.redis = Redis.getInstance(config);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ws = context.switchToWs();
    const client = ws.getClient<Socket>();

    const sessionId = extractSession(client.handshake.headers.cookie);

    if (!sessionId) {
      return false;
    }

    const session = await this.redis.get(`sess:${sessionId}`);

    return !!session;
  }
}
