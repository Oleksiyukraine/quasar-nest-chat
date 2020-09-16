// Nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Services
import MessagesService from './messages.service';

// Controllers
import MessagesController from './messages.controller';

// Schemas
import MessageSchema from './schemas/message.schemas';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Message', schema: MessageSchema },
      ],
    ),
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export default class MessagesModule {
}
