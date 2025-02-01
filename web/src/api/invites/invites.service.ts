import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeInviteWithUser, TypeInviteWithWorkspace } from '@/types'
import qs from 'query-string'
import {
	FindAllUserInvitesInput,
	FindAllWorkspaceInvitesInput,
	findAllUserInvitesSchema,
	findAllWorkspaceInvitesSchema
} from './invites.dto'

const findAllByUserId = async (input: FindAllUserInvitesInput) => {
	findAllUserInvitesSchema.parse(input)
	const url = qs.stringifyUrl({
		url: ApiRoutes.INVITES.USER,
		query: input
	})
	return (await axios.get<TypeInviteWithUser[]>(url)).data
}

const findAllByWorkspaceId = async (input: FindAllWorkspaceInvitesInput) => {
	findAllWorkspaceInvitesSchema.parse(input)

	const url = qs.stringifyUrl({
		url: ApiRoutes.INVITES.WORKSPACE,
		query: input
	})

	return (await axios.get<TypeInviteWithWorkspace[]>(url)).data
}

export const InvitesApi = {
	findAllByUserId,
	findAllByWorkspaceId
} as const
