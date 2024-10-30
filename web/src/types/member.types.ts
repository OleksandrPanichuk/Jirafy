export enum MemberRole {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	MEMBER = 'MEMBER',
	GUEST = 'GUEST'
}

export type TypeMember = {
	id: string
	userId: string
	role?: MemberRole

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
