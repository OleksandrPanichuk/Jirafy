import { envSchema } from '@/shared/config';
import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { InvitesModule } from './invites/invites.module';
import { MembersModule } from './members/members.module';
import { ProjectsModule } from './projects/projects.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validate: (config) => envSchema.validateSync(config),
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ProjectsModule,
    MembersModule,
    StorageModule,
    FavoritesModule,
    ActivityModule,
    InvitesModule,
  ],
})
export class AppModule {}
