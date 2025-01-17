import { IsMongoId } from "class-validator"


export class RejectInviteInput {
	@IsMongoId()
	readonly inviteId: string
}