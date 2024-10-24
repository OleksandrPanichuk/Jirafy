import { AuthenticatedGuard } from '@/common/guards';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SendTokenInput, VerifyEmailInput } from './dto';
import { EmailService } from './email.service';

@UseGuards(AuthenticatedGuard)
@Controller('/auth/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-token')
  public sendResetPasswordToken(@Body() dto: SendTokenInput) {
    return this.emailService.sendVerifyEmailToken(dto);
  }

  @Post('verify')
  public verifyEmail(@Body() dto: VerifyEmailInput) {
    return this.emailService.verify(dto);
  }
}
