import { IsMongoId } from "class-validator"



export class DeleteMemberParams {

	@IsMongoId()
	readonly memberId:string
}