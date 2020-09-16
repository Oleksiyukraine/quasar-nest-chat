// Nest
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import configModule from './configure.root';

// Modules
import MessagesModule from './modules/messages/messages.module';

// Sockets
import SocketGateway from './socket.gateway';

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI_LOCAL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    MessagesModule,
  ],
  providers: [
    SocketGateway,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export default class AppModule {}
