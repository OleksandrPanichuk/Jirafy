import { ConfigService } from '@nestjs/config';
import { RedisStore } from 'connect-redis';
import { SessionOptions } from 'express-session';
import { SESSION_COOKIE_NAME } from '@/shared/constants';
import { Redis } from '@/shared/helpers';

const MAX_AGE = 1000 * 60 * 60 * 24 * 7;

export function getSessionConfig(config: ConfigService): SessionOptions {
  const redis = Redis.getInstance(config);
  return {
    secret: config.get<string>('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: MAX_AGE,
    },
    name: SESSION_COOKIE_NAME,
    store: new RedisStore({
      client: redis,
    }),
  };
}
