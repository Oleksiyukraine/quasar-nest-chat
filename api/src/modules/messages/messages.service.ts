// Nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Mongoose
import { Model } from 'mongoose';

// Interfaces
import { IMessage } from './interfaces/messages.interface';

// DTO`s
import MessagesDto from './dto/messages.dto';

@Injectable()
export default class MessagesService {
  constructor(
    @InjectModel('Message') private readonly MessageModel: Model<IMessage>,
  ) {}

  async create(messageDto: MessagesDto) {
    const message = new this.MessageModel(messageDto);
    return message.save();
  }

  async list() {
    return this.MessageModel.find();
  }
}
