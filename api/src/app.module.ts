import { envSchema } from '@/shared/config';
import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { InvitesModule } from './invites/invites.module';
import { MembersModule } from './members/members.module';
import { ProjectsModule } from './projects/projects.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { ConversationsModule } from './conversations/conversations.module';
import { ChannelsModule } from './channels/channels.module';
import { ChatModule } from './chat/chat.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validate: (config) => envSchema.validateSync(config),
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ttl: 3600 * 1000,
          stores: [createKeyv(config.get<string>('REDIS_URL'))],
        };
      },
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
    ConversationsModule,
    ChannelsModule,
    ChatModule,
    ReactionsModule,
  ],
})
export class AppModule {}
