import { MailerModule } from '@app/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [MailerModule, JwtModule.register({})],
})
export class EmailModule {}
