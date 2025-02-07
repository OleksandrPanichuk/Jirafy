import { MembersModule } from '@/members/members.module'
import { UsersModule } from '@/users/users.module'
import { MailerModule } from '@app/mailer'
import { Module } from '@nestjs/common'
import { InvitesController } from './invites.controller'
import { InvitesGateway } from './invites.gateway'
import { InvitesService } from './invites.service'

@Module({
  imports: [MailerModule, MembersModule, UsersModule],
  controllers: [InvitesController],
  providers: [InvitesService, InvitesGateway],
})
export class InvitesModule {}
