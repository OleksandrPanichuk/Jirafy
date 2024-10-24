import { UsersService } from '@/users/users.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy, LocalStrategy } from './strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { PasswordModule } from './password/password.module'

@Module({
  imports: [PassportModule.register({ session: true }), PasswordModule],
  providers: [
    AuthService,
    SessionSerializer,
    LocalStrategy,
    GoogleStrategy,
    GithubStrategy,
    UsersService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
