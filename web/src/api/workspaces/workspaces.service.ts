import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeWorkspace, TypeWorkspaceWithMembers } from '@/types'
import { CreateWorkspaceInput, createWorkspaceSchema } from './workspaces.dto'

const findAll = async () => {
	return (await axios.get<TypeWorkspaceWithMembers[]>(ApiRoutes.WORKSPACES.ALL))
		.data
}

const create = async (input: CreateWorkspaceInput) => {
	createWorkspaceSchema.parse(input)
	return await axios.post<TypeWorkspace>(ApiRoutes.WORKSPACES.ROOT, input)
}

export const WorkspacesApi = {
	findAll,
	create
} as const
