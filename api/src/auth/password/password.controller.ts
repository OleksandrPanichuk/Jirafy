import { Body, Controller, Post } from '@nestjs/common';
import { SendTokenInput } from './dto/send-token.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('send-token')
  public sendResetPasswordToken(@Body() dto: SendTokenInput) {
    return this.passwordService.sendResetPasswordToken(dto);
  }
}
