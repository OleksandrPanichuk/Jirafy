import { IsArray, IsMongoId } from "class-validator"


export class RejectInviteInput {
	@IsArray()
	@IsMongoId({each:true})
	readonly invites: string[]
}