import { MailerService } from '@app/mailer';
import { EmailTemplates } from '@app/mailer/mailer.constants';
import { PrismaService } from '@app/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { ResetPasswordInput, SendTokenInput, VerifyTokenInput } from './dto';

@Injectable()
export class PasswordService {
  private readonly TOKEN_EXPIRATION =
    this.config.get<number>('TOKEN_EXPIRATION') || 1000 * 60 * 60;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {}

  public async sendResetPasswordToken(dto: SendTokenInput): Promise<string> {
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
    const link = `${clientUrl}/reset-password?token=${token}`

    await this.mailer.sendHTML(
      EmailTemplates.RESET_PASSWORD,
      {
        to: user.email,
        subject: 'Reset password at Jirafy',
      },
      { email: user.email, link },
    );

    return 'Check your email for the reset password link';
  }

  public async verifyToken(dto: VerifyTokenInput): Promise<string> {
    const reset = await this.prisma.passwordReset.findUnique({
      where: { token: dto.token },
    });

    if (!reset) {
      throw new BadRequestException('Invalid token');
    }

    if (Date.now() > reset.validUntil.getTime()) {
      throw new BadRequestException('Token expired');
    }

    return 'Token is valid';
  }

  public async resetPassword(dto: ResetPasswordInput): Promise<string> {
    const reset = await this.prisma.passwordReset.findUnique({
      where: { token: dto.token },
    });

    if (!reset) {
      throw new BadRequestException('Invalid token');
    }

    const hash = await this.hashPassword(dto.password);

    await this.prisma.user.update({
      where: { id: reset.userId },
      data: { hash },
    });

    await this.prisma.passwordReset.delete({
      where: { id: reset.id },
    });

    return 'Password reset successfully';
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
