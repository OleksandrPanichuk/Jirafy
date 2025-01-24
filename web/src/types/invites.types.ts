import { TypeProject } from "./project.types"
import { TypeUser } from "./user.types"
import { TypeWorkspace } from "./workspace.types"


export enum InviteState {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED',
}

export enum InviteMemberRole {
	ADMIN = 'ADMIN',
	MEMBER = 'MEMBER',
	GUEST	= 'GUEST'
}

export type TypeInvite = {
	id:string
	email:string
	state: InviteState
	role: InviteMemberRole

	userId:string

	createdAt:Date
	updatedAt:Date

	workspaceId?: string
	projectId?: string
}

export type TypeInviteWithWorkspace = TypeInvite & {
	workspace: TypeWorkspace
}

export type TypeInviteWithProject = TypeInvite & {
	project: TypeProject
}

export type TypeInviteWithUser = TypeInvite & {
	user: TypeUser
}