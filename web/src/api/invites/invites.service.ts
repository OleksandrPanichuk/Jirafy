import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeInvite, TypeInviteWithUser, TypeInviteWithWorkspace } from '@/types'
import qs from 'query-string'
import {
	AcceptInvitesInput,
	FindAllUserInvitesInput,
	FindAllWorkspaceInvitesInput,
	RejectInvitesInput,
	acceptInvitesSchema,
	findAllUserInvitesSchema,
	findAllWorkspaceInvitesSchema,
	rejectInvitesSchema
} from './invites.dto'

const findAllUserInvites = async (input: FindAllUserInvitesInput) => {
	findAllUserInvitesSchema.parse(input)
	const url = qs.stringifyUrl({
		url: ApiRoutes.INVITES.USER,
		query: input
	})
	return (await axios.get<TypeInviteWithWorkspace[]>(url)).data
}

const findAllByWorkspaceId = async (input: FindAllWorkspaceInvitesInput) => {
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

const reject = async (input:RejectInvitesInput) => {
	rejectInvitesSchema.parse(input)

	return await axios.post<TypeInvite[]>(ApiRoutes.INVITES.REJECT, input)
}

export const InvitesApi = {
	findAllUserInvites,
	findAllByWorkspaceId,
	accept,
	reject
} as const
