import { Module } from "@nestjs/common"
import { EmailController } from "./email.controller"
import { EmailService } from "./email.service"
import { MailerModule } from "@app/mailer"



@Module({
		controllers: [EmailController],
		providers: [EmailService],
		imports: [MailerModule]
})
export class EmailModule {}