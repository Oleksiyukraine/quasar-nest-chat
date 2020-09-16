// Nest imports
import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Services
import MessagesService from './messages.service';

// DTO`s
import MessagesDto from './dto/messages.dto';
import { IMessage } from './interfaces/messages.interface';

@ApiTags('messages')
@Controller('messages')
export default class MessagesController {
  constructor(private readonly messageService: MessagesService) { }

  @Get('/')
  async list() {
    return this.messageService.list();
  }

  @Post('/')
  async create(@Body(ValidationPipe) messageDto: MessagesDto): Promise<IMessage> {
    return this.messageService.create(messageDto);
  }
}
