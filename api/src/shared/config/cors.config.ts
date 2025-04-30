import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';

dotenv.config();

export const corsConfig: CorsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
};
