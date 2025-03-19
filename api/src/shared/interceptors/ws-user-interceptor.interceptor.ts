import { extractSession, Redis } from '@/shared/helpers';
import { SessionData } from '@/shared/interfaces';
import { UsersService } from '@/users/users.service';
import { PrismaService } from '@app/prisma';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { Redis as TypeRedis } from 'ioredis';

@Injectable()
export class WsUserInterceptor implements NestInterceptor {
  private redis: TypeRedis;
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly config: ConfigService,
  ) {
    this.redis = Redis.getInstance(config);
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ws = context.switchToWs();
    const client = ws.getClient<Socket>();

    const sessionId = extractSession(client.handshake.headers.cookie);

    if (!sessionId) {
      return next.handle();
    }

    const sessionString = await this.redis.get(`sess:${sessionId}`);

    if (!sessionString) {
      return next.handle();
    }

    const sessionData = JSON.parse(sessionString) as SessionData;

    const userId = sessionData.passport.user;

    const user = await this.userService.findById(userId);

    client.data.user = user;

    return next.handle();
  }
}
