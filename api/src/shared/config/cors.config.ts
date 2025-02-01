import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
} 
