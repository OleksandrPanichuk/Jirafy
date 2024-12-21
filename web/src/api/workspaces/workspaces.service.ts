import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeWorkspace, TypeWorkspaceWithMembers } from '@/types'
import {
	CreateWorkspaceInput,
	createWorkspaceSchema,
	deleteWorkspaceSchema,
	SelectWorkspaceInput,
	selectWorkspaceSchema,
	UpdateWorkspaceInput,
	updateWorkspaceSchema
} from './workspaces.dto'

const findAll = async () => {
	return (await axios.get<TypeWorkspaceWithMembers[]>(ApiRoutes.WORKSPACES.ALL))
		.data
}

const create = async (input: CreateWorkspaceInput) => {
	createWorkspaceSchema.parse(input)
	return await axios.post<TypeWorkspaceWithMembers>(
		ApiRoutes.WORKSPACES.ROOT,
		input
	)
}

const select = async (input: SelectWorkspaceInput) => {
	selectWorkspaceSchema.parse(input)
	return await axios.post(ApiRoutes.WORKSPACES.SELECT, input)
}

const update = async (input: UpdateWorkspaceInput) => {
	updateWorkspaceSchema.parse(input)

	const { workspaceId, ...rest } = input

	return await axios.patch<TypeWorkspace>(
		ApiRoutes.WORKSPACES.BY_ID(workspaceId),
		rest
	)
}

const deleteWorkspace = async (workspaceId: string) => {
	deleteWorkspaceSchema.parse({ workspaceId })
	return await axios.delete<TypeWorkspace>(
		ApiRoutes.WORKSPACES.BY_ID(workspaceId)
	)
}

export const WorkspacesApi = {
	findAll,
	create,
	select,
	update,
	delete: deleteWorkspace
} as const
