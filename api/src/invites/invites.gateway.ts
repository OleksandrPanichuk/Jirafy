import { SocketEvents } from '@/shared/enums';
import {
  WebSocketExceptionFilter,
  WebSocketValidationFilter,
} from '@/shared/filters';
import { WsAuthenticatedGuard } from '@/shared/guards';
import { UseFilters, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateInviteInput } from './dto';
import { InvitesService } from './invites.service';

@UseGuards(WsAuthenticatedGuard)
@UseFilters(WebSocketExceptionFilter, WebSocketValidationFilter)
@WebSocketGateway({
  namespace: 'invites',
})
export class InvitesGateway {
  constructor(private readonly invitesService: InvitesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(SocketEvents.CREATE_INVITE)
  async createInvite(@MessageBody() dto: CreateInviteInput) {
    const data = await this.invitesService.create(dto);

    this.server.to(data.user.id).emit(SocketEvents.INVITE_CREATED, data);

    return {
      status: 'success',
      message: 'Invite created successfully',
    };
  }
}
