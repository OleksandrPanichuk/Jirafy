import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import qs from 'query-string'
import {
	FindAllInvitesInput,
	FindAllProjectInvitesInput,
	FindAllUserInvitesInput,
	FindAllWorkspaceInvitesInput,
	findAllInvitesSchema
} from './invites.dto'
import { TypeInviteWithProject, TypeInviteWithUser, TypeInviteWithWorkspace } from '@/types'

const findAll = async <T>(input: FindAllInvitesInput) => {
	findAllInvitesSchema.parse(input)

	const url = qs.stringifyUrl({
		url: ApiRoutes.INVITES.ROOT,
		query: input
	})

	return (await axios.get<T[]>(url)).data
}

const findAllByUserId = (input: FindAllUserInvitesInput) => {
	return findAll<TypeInviteWithUser>(input)
}

const findAllByWorkspaceId = async (input: FindAllWorkspaceInvitesInput) => {
	return findAll<TypeInviteWithWorkspace>(input)
}

const findAllByProjectId = async (input: FindAllProjectInvitesInput) => {
	return findAll<TypeInviteWithProject>(input)
}

export const InvitesApi = {
	findAllByUserId,
	findAllByWorkspaceId,
	findAllByProjectId
} as const


