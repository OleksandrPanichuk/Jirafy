import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  WsExceptionFilter,
} from '@nestjs/common';
import { Socket } from 'socket.io';

@Catch(BadRequestException)
export class WebSocketValidationFilter implements WsExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();

    const response = {
      message: exception.message,
      error: exception.getResponse(),
    };

    client.emit('exception', response);
  }
}
