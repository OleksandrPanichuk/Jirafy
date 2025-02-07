import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import {
	TypeInvite,
	TypeInviteWithUser,
	TypeInviteWithWorkspace
} from '@/types'
import qs from 'query-string'
import {
	AcceptInvitesInput,
	DeleteInviteInput,
	FindAllUserInvitesInput,
	FindAllWorkspaceInvitesInput,
	RejectInvitesInput,
	UpdateInviteInput,
	acceptInvitesSchema,
	deleteInviteSchema,
	findAllUserInvitesSchema,
	findAllWorkspaceInvitesSchema,
	rejectInvitesSchema,
	updateInviteSchema
} from './invites.dto'

const findAllUserInvites = async (input: FindAllUserInvitesInput) => {
	findAllUserInvitesSchema.parse(input)
	const url = qs.stringifyUrl({
		url: ApiRoutes.INVITES.USER,
		query: input
	})
	return (await axios.get<TypeInviteWithWorkspace[]>(url)).data
}

const findAllWorkspaceInvite = async (input: FindAllWorkspaceInvitesInput) => {
	findAllWorkspaceInvitesSchema.parse(input)

	const url = qs.stringifyUrl({
		url: ApiRoutes.INVITES.WORKSPACE,
		query: input
	})

	return (await axios.get<TypeInviteWithUser[]>(url)).data
}

const accept = async (input: AcceptInvitesInput) => {
	acceptInvitesSchema.parse(input)

	return await axios.post<TypeInvite[]>(ApiRoutes.INVITES.ACCEPT, input)
}

const reject = async (input: RejectInvitesInput) => {
	rejectInvitesSchema.parse(input)

	return await axios.post<TypeInvite[]>(ApiRoutes.INVITES.REJECT, input)
}

const deleteInvite = async (input: DeleteInviteInput) => {
	deleteInviteSchema.parse(input)

	return await axios.delete<TypeInvite>(ApiRoutes.INVITES.BY_ID(input.inviteId))
}

const update = async (input: UpdateInviteInput) => {
	updateInviteSchema.parse(input)

	return await axios.patch(ApiRoutes.INVITES.ROOT, input)
}

export const InvitesApi = {
	findAllUserInvites,
	findAllWorkspaceInvite,
	accept,
	reject,
	delete: deleteInvite,
	update
} as const
