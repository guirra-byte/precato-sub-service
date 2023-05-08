import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload, client.id);
  }

  afterInit(client: Socket): void {
    this.logger.log(`Server Init`);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client is connected to ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client is disconnected from ${client.id}`);
  }
}
