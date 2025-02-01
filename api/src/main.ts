import * as dotenv from 'dotenv'
dotenv.config()
import { corsConfig } from '@/shared/config';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

import { getSessionConfig } from '@/shared/config/session.config';
import { ValidationPipe } from '@nestjs/common';
import CookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const PORT = config.get('PORT');

  app.use(helmet());

  app.enableCors(corsConfig);

  app.setGlobalPrefix('api');

  app.use(CookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(session(getSessionConfig(config)));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}
bootstrap();
