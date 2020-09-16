import { ConfigModule } from '@nestjs/config';

const environment = process.env.NODE_ENV || 'development';

const configModule = ConfigModule.forRoot({
  envFilePath: `.env.${environment}`,
  isGlobal: true,
});

export default configModule;
