import { Network } from './common.types'
import { TypeFile } from './file.types'
import { MemberRole } from './member.types'

export type TypeProject = {
	id: string
	name: string
	description?: string
	cover?: TypeFile
	emoji?: string
	network: Network
	identifier: string

	createdAt: Date
	updatedAt: Date

	workspaceId: string
}

export type TypeProjectWithMembers = TypeProject & {
	members: {
		role: MemberRole
		projectOrder: number
		defaultAssignee: boolean
		isLead: boolean
	}[]
}
