import { InviteMemberRole } from "@prisma/client"
import { IsEnum, IsMongoId } from "class-validator"



export class UpdateInviteInput {

	@IsEnum(InviteMemberRole)
	readonly role: InviteMemberRole

	@IsMongoId()
	readonly inviteId: string;
}