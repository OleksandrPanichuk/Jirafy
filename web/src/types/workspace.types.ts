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
		id: string
		role: MemberRole
		isWorkspaceSelected: boolean
	}[]
}
