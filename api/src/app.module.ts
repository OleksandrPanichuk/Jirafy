import { PrismaModule } from '@app/prisma';
import { envSchema } from '@config/env.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validationSchema: envSchema,
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    WorkspacesModule,
  ],
})
export class AppModule {}
