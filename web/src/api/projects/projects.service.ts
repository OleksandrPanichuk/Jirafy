import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeProject } from '@/types'

const findAllByWorkspaceSlug = async (slug: string) => {
	return (
		await axios.get<TypeProject[]>(ApiRoutes.PROJECTS.BY_WORKSPACE_SLUG(slug))
	).data
}

export const ProjectsApi = {
	findAllByWorkspaceSlug
} as const
