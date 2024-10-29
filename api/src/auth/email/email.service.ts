import { MailerService } from '@app/mailer';
import { PrismaService } from '@app/prisma';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChangeEmailInput,
  SendVerificationLinkInput,
  VerifyEmailInput,
} from './dto';

import { EmailTemplates } from '@app/mailer/mailer.constants';
import { v4 as uuid } from 'uuid';

import { omit } from 'lodash';

@Injectable()
export class EmailService {
  private readonly TOKEN_EXPIRATION =
    this.config.get<number>('TOKEN_EXPIRATION') || 1000 * 60 * 60;
  constructor(
    private readonly mailer: MailerService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  public async changeEmail(dto: ChangeEmailInput, userId: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.newEmail,
      }
    })

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: dto.newEmail,
      },
    });

    return omit(updatedUser, 'hash');
  }

  public async sendVerificationLink(
    dto: SendVerificationLinkInput,
  ): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = uuid();

    await this.prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    });

    await this.prisma.passwordReset.create({
      data: {
        token,
        userId: user.id,
        email: user.email,
        validUntil: new Date(Date.now() + this.TOKEN_EXPIRATION),
      },
    });

    const clientUrl = this.config.get<string>('CLIENT_URL');
    const link = `${clientUrl}/verify-email?token=${token}`;

    await this.mailer.sendHTML(
      EmailTemplates.VERIFY_EMAIL,
      {
        to: user.email,
        subject: 'Verify email at Jirafy',
      },
      { name: user.firstName || 'Dear Customer', link },
    );

    return 'Check your email for the email verification link';
  }

  public async verify(dto: VerifyEmailInput): Promise<string> {
    const reset = await this.prisma.passwordReset.findUnique({
      where: { token: dto.token },
    });

    if (!reset) {
      throw new BadRequestException('Invalid token');
    }

    if (Date.now() > reset.validUntil.getTime()) {
      throw new BadRequestException('Token expired');
    }

    await this.prisma.user.update({
      where: { id: reset.userId },
      data: { verified: true },
    });

    return 'Email verified';
  }
}
