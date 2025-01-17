import { IsMongoId } from "class-validator"



export class AcceptInviteInput {
	@IsMongoId()
	readonly inviteId: string
}