import { MemberRole } from "@prisma/client"
import { IsBoolean, IsEnum, IsMongoId, IsOptional } from "class-validator"



export class CreateProjectMemberInput {
	@IsMongoId()
	readonly userId:string

	@IsMongoId()
	readonly projectId:string

	@IsMongoId()
	readonly workspaceId:string

	@IsEnum(MemberRole)
	readonly role:MemberRole

	@IsOptional()
	@IsBoolean()
	readonly isLead?: boolean

	@IsOptional()
	@IsBoolean()
	readonly defaultAssignee?: boolean
}