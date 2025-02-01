import { corsConfig } from '@/shared/config';
import { WsCurrentUserDecorator } from '@/shared/decorators';
import { SocketEvents } from '@/shared/enums';
import {
  WebSocketExceptionFilter,
  WebSocketValidationFilter,
} from '@/shared/filters';
import { WsAuthenticatedGuard } from '@/shared/guards';
import { WsUserInterceptor } from '@/shared/interceptors';
import {
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  GatewayMetadata,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateInviteInput } from './dto';
import { InvitesService } from './invites.service';

@UsePipes(new ValidationPipe())
@UseGuards(WsAuthenticatedGuard)
@UseFilters(WebSocketExceptionFilter, WebSocketValidationFilter)
@WebSocketGateway({
  namespace: 'invites',
  path: '/invites',
  cors: corsConfig,
} as GatewayMetadata)
export class InvitesGateway {
  constructor(private readonly invitesService: InvitesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(SocketEvents.JOIN_ROOM)
  async joinRoom(
    @MessageBody() userId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(userId);

    return {
      status: 'success',
      message: 'Joined room successfully',
    };
  }

  @SubscribeMessage(SocketEvents.LEAVE_ROOM)
  async leaveRoom(
    @MessageBody() userId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.leave(userId);

    return {
      status: 'success',
      message: 'Left room successfully',
    };
  }

  @UseInterceptors(WsUserInterceptor)
  @SubscribeMessage(SocketEvents.CREATE_INVITE)
  async createInvite(
    @MessageBody() dto: CreateInviteInput,
    @WsCurrentUserDecorator('id') senderId: string,
  ) {
    const data = await this.invitesService.create(dto, senderId);

    this.server.to(data.user.id).emit(SocketEvents.INVITE_CREATED, data);

    return {
      status: 'success',
      message: 'Invite created successfully',
    };
  }
}
