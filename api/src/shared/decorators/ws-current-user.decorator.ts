import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User as TypeUser } from '@prisma/client'
import { Socket } from 'socket.io'

export const WsCurrentUserDecorator = createParamDecorator(
  async (data: keyof Omit<TypeUser, 'hash'>, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient<Socket>();

    const user = client.data.user as TypeUser;
    return data ? user?.[data] : user;
  },
);
