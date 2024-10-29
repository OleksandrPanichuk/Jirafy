import { PrismaService } from '@app/prisma'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { SignInInput, SignUpInput, VerifyIdentityInput } from './dto'

import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { OAuthState } from './auth.constants'
import { OAuthUser } from './auth.types'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async verifyIdentity({ password }: VerifyIdentityInput, id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verified = await bcrypt.compare(password, user.hash);

    if (!verified) {
      throw new ForbiddenException('Invalid password');
    }

    const identityToken = this.jwtService.sign({ id, verified }, { expiresIn: '1d' });

    return identityToken;
  }

  public async signUp(dto: SignUpInput) {
    const { email, firstName, lastName, username, verified, avatar, password } =
      dto;

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });

    if (existingUser?.email === email) {
      throw new ConflictException('Email already in use');
    } else if (existingUser?.username === username) {
      throw new ConflictException('Username already in use');
    } else if (existingUser?.id) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        username,
        verified,
        avatar,
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

    const { email, username, firstName, lastName, avatar } = input;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const [fn, ln] = username?.split(' ') ?? [undefined, undefined];
      const data = {
        state: OAuthState.NO_ACCOUNT,
        user: {
          email,
          firstName: firstName ?? fn,
          lastName: lastName ?? ln,
          username: username ?? this.extractDisplayNameFromEmail(email),
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
