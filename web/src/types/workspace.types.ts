import { TypeFile } from './file.types'
import { MemberRole } from './member.types'

export type TypeWorkspace = {
	id: string
	name: string
	slug: string
	size: number
	logo?: TypeFile

	createdAt: Date
	updatedAt: Date
}

export type TypeWorkspaceWithMembers = TypeWorkspace & {
	members: {
		role: MemberRole
		isLead: boolean
		defaultAssignee: boolean
		isWorkspaceSelected: boolean
	}[]
}
