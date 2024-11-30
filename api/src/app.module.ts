import { PrismaModule } from '@app/prisma';
import { envSchema } from '@config/env.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MembersModule } from './members/members.module';
import { ProjectsModule } from './projects/projects.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validate: (config) =>
        envSchema.validateSync(config),
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ProjectsModule,
    MembersModule,
    StorageModule,
    FavoritesModule,
  ],
})
export class AppModule {}
