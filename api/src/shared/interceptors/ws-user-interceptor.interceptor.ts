import { extractSession } from '@/shared/helpers';
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

@Injectable()
export class WsUserInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

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

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });



    if (!session) {
      return next.handle();
    }

    const sessionData = JSON.parse(session.session) as SessionData;



    const userId = sessionData.passport.user;

    const user = await this.userService.findById(userId);


    client.data.user = user;

    return next.handle();
  }
}
