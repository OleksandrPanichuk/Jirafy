import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeProject, TypeProjectWithMembers } from '@/types'
import { CreateProjectInput, createProjectSchema } from './projects.dto'

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

export const ProjectsApi = {
	findAllByWorkspaceSlug,
	create
} as const
