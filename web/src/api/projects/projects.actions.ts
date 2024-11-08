'use server'

import { ProjectsApi } from './projects.service'

export async function getAllProjectsByWorkspaceSlug(slug: string) {
	try {
		return await ProjectsApi.findAllByWorkspaceSlug(slug)
	} catch (err) {
		return []
	}
}
