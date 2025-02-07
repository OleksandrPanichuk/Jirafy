import { IsMongoId } from "class-validator"


export class DeleteInviteParams {
	

	@IsMongoId()
	readonly inviteId: string;
}