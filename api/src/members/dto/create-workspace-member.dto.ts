import { MemberRole } from "@prisma/client"
import { IsEnum, IsMongoId } from "class-validator"


export class CreateWorkspaceMemberInput {
	@IsMongoId()
	readonly userId:string

	@IsMongoId()
	readonly workspaceId:string

	@IsEnum(MemberRole)
	readonly role:MemberRole
}