import { PrismaService } from '@app/prisma';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInInput, SignUpInput, VerifyInput } from './dto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuthState } from './auth.constants';
import { OAuthUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async verify(input: VerifyInput) {
    const user = await this.prisma.user.findUnique({
      where: input,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: 'ok',
    };
  }

  public async signUp(dto: SignUpInput) {
    const { email, firstName, lastName } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser?.id) throw new ConflictException('Email already in use');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);

    return await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        displayName: this.extractDisplayNameFromEmail(dto.email),
        hash,
      },
    });
  }

  public async signIn(input: SignInInput) {
    const { email, password } = input;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user?.hash)
      throw new BadRequestException('Password is not set. Use OAuth instead');

    const doPasswordsMatch = await bcrypt.compare(password, user.hash);

    if (!doPasswordsMatch)
      throw new ForbiddenException('Invalid email or password');

    return user;
  }

  public async signInWithOAuth(input: Partial<OAuthUser>) {
    if (!input) throw new UnauthorizedException('Unauthenticated');

    const { email, displayName, firstName, lastName, avatar } = input;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const [fn, ln] = displayName?.split(' ') ?? [undefined, undefined];
      const data = {
        state: OAuthState.NO_ACCOUNT,
        user: {
          email,
          firstName: firstName ?? fn,
          lastName: lastName ?? ln,
          displayName: displayName ?? this.extractDisplayNameFromEmail(email),
          avatar,
          verified: true,
        },
      };

      const token = this.jwtService.sign(data, {
        expiresIn: '10m',
      });

      return {
        state: OAuthState.NO_ACCOUNT,
        token,
      };
    }

    return {
      state: OAuthState.SIGNED_IN,
      userId: user.id,
    };
  }

  private extractDisplayNameFromEmail(email: string) {
    return email.split('@')[0];
  }
}
