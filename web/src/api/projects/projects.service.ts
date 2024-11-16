import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeProject, TypeProjectWithMembers } from '@/types'
import {
	CreateProjectInput,
	createProjectSchema,
	ReorderProjectsInput,
	reorderProjectsSchema
} from './projects.dto'

const findAllByWorkspaceSlug = async (slug: string) => {
	return (
		await axios.get<TypeProjectWithMembers[]>(
			ApiRoutes.PROJECTS.BY_WORKSPACE_SLUG(slug)
		)
	).data
}

const create = async (input: CreateProjectInput) => {
	createProjectSchema.parse(input)
	return await axios.post<TypeProject>(ApiRoutes.PROJECTS.ROOT, input)
}

const reorder = async (input: ReorderProjectsInput) => {
	reorderProjectsSchema.parse(input)
	return await axios.put(ApiRoutes.PROJECTS.REORDER, input)
}

export const ProjectsApi = {
	findAllByWorkspaceSlug,
	create,
	reorder
} as const
