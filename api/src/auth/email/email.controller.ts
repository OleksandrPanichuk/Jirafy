import { AuthenticatedGuard } from '@/common/guards';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SendVerificationLinkInput, VerifyEmailInput } from './dto';
import { EmailService } from './email.service';

@UseGuards(AuthenticatedGuard)
@Controller('/auth/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-link')
  public sendVerificationLink(@Body() dto: SendVerificationLinkInput) {
    return this.emailService.sendVerificationLink(dto);
  }

  @Post('verify')
  public verifyEmail(@Body() dto: VerifyEmailInput) {
    return this.emailService.verify(dto);
  }
}
