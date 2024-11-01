'use server'

import { TypeWorkspaceWithMembers } from '@/types'
import { WorkspacesApi } from './workspaces.service'

export async function getAllWorkspaces(): Promise<TypeWorkspaceWithMembers[]> {
	try {
		return await WorkspacesApi.findAll()
	} catch (err) {
		return []
	}
}
