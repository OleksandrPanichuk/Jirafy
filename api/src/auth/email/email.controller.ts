import { CurrentUser } from '@/shared/decorators';
import { AuthenticatedGuard, IdentityVerifiedGuard } from '@/shared/guards';
import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ChangeEmailInput,
  SendVerificationLinkInput,
  VerifyEmailInput,
} from './dto';
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

  @Patch('change')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(IdentityVerifiedGuard)
  changeEmail(
    @Body() dto: ChangeEmailInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.emailService.changeEmail(dto, userId);
  }
}
