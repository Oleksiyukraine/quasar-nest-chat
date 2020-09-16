// Nest
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

// Socket
import { Socket, Server } from 'socket.io';

// Services
import MessagesService from './modules/messages/messages.service';

// Dto`s
import MessagesDto from './modules/messages/dto/messages.dto';

@WebSocketGateway()
export default class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly messageService: MessagesService,
  ) {}

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnect', client.id);
    this.wss.emit('userDisconnected', client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Connect', client.id);
    return { event: 'messageList', data: ['messageList'] };
  }

  @SubscribeMessage('getMessageFromServer')
  async messageList(client: Socket, text: string): Promise<WsResponse<object>> {
    const messages = await this.messageService.list();
    this.wss.emit('userConnected', text);
    return { event: 'messageList', data: messages };
  }

  @SubscribeMessage('createMessage')
  async createMessage(client: Socket, message: MessagesDto): Promise<void> {
    const newMessage = await this.messageService.create(message);
    this.wss.emit('messageListUpdated', newMessage);
  }
}
