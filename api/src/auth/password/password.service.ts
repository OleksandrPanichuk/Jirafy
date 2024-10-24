import { MailerService } from '@app/mailer';
import { EmailTemplates } from '@app/mailer/mailer.constants';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { SendTokenInput } from './dto/send-token.dto';

@Injectable()
export class PasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  public async sendResetPasswordToken(dto: SendTokenInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const token = uuid();

    await this.prisma.passwordReset.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await this.prisma.passwordReset.create({
      data: {
        token,
        userId: user.id,
        email: user.email,
      },
    });

    await this.mailer.sendWithMailgun(
      EmailTemplates.RESET_PASSWORD,
      {
        to: user.email,
        subject: 'Reset password at Jirafy',
      },
      { email: user.email, token },
    );

    return 'Check your email for the reset password link';
  }
}
