import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as TypeUser } from '@prisma/client';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  async (data: keyof Omit<TypeUser, 'hash'>, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as Omit<TypeUser, 'hash'>;
    return data ? user?.[data] : user;
  },
);
