import { TypeFile } from './file.types'

export enum MemberRole {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	MEMBER = 'MEMBER',
	GUEST = 'GUEST'
}

export enum MemberType {
	WORKSPACE = 'WORKSPACE',
	PROJECT = 'PROJECT',
	CHAT = 'CHAT',
	CONVERSATION = 'CONVERSATION',
	PAGE = 'PAGE'
}

export type TypeMember = {
	id: string
	userId: string

	type: MemberType
	role: MemberRole

	createdAt: Date
	updatedAt: Date

	workspaceId?: string
	projectId?: string
	pageId?: string
	conversationId?: string

	defaultAssignee?: boolean
	isLead?: boolean

	isWorkspaceSelected?: boolean
}

export type TypeMemberWithUser = TypeMember & {
	user: {
		id: string
		username: string
		email: string
		firstName: string
		lastName: string
		avatar?: TypeFile
	}
}
