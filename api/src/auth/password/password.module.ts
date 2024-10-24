import { MailerModule } from '@app/mailer'
import { Module } from '@nestjs/common'
import { PasswordController } from './password.controller'
import { PasswordService } from './password.service'

@Module({
  controllers: [PasswordController],
  providers: [PasswordService],
  imports: [MailerModule]
})
export class PasswordModule {}
