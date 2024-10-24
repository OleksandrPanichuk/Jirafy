import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ResetPasswordInput, SendTokenInput, VerifyTokenInput } from './dto';
import { PasswordService } from './password.service';

@Controller('/auth/password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('send-token')
  public sendResetPasswordToken(@Body() dto: SendTokenInput) {
    return this.passwordService.sendResetPasswordToken(dto);
  }

  @Patch('reset')
  public resetPassword(@Body() dto: ResetPasswordInput) {
    return this.passwordService.resetPassword(dto);
  }

  @Post('verify-token')
  public verifyToken(@Body() dto: VerifyTokenInput) {
    return this.passwordService.verifyToken(dto);
  }
}
