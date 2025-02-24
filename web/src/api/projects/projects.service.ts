import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeProject, TypeProjectWithCurrentMember, TypeProjectWithMembers } from '@/types'
import {
	CreateProjectInput,
	createProjectSchema,
	FindAllProjectsWithFiltersInput,
	ReorderProjectsInput,
	reorderProjectsSchema
} from './projects.dto'

const findAllByWorkspaceSlug = async (slug: string) => {
	return (
		await axios.get<TypeProjectWithCurrentMember[]>(
			ApiRoutes.PROJECTS.BY_WORKSPACE_SLUG(slug)
		)
	).data
}

const findAllByWorkspaceSlugWithFilters = async (input: FindAllProjectsWithFiltersInput) => {

	const { slug, ...rest } = input
	return (
		await axios.post<TypeProjectWithMembers[]>(ApiRoutes.PROJECTS.BY_WORKSPACE_SLUG_WITH_FILTERS(slug), rest)
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
	findAllByWorkspaceSlugWithFilters,
	create,
	reorder
} as const
