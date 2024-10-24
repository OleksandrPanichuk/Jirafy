import { ConfigService } from '@nestjs/config';
// @ts-expect-error Works fine
import { create as createMongoDBStore } from 'connect-mongo';
import { SessionOptions } from 'express-session';

const MAX_AGE = 1000 * 60 * 60 * 24 * 7;
const SESSION_NAME = 'chatify-session';

export function getSessionConfig(config: ConfigService): SessionOptions {
  return {
    secret: config.get<string>('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: MAX_AGE,
    },
    name: SESSION_NAME,
    store: createMongoDBStore({
      mongoUrl: config.get<string>('DATABASE_URL'),
      collectionName: 'sessions',
      ttl: MAX_AGE / 1000,
    }),
  };
}
