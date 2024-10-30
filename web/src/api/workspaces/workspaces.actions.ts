'use server'

import { TypeWorkspace } from '@/types'
import { WorkspacesApi } from './workspaces.service'

export async function getAllWorkspaces(): Promise<TypeWorkspace[]> {
	try {
		return await WorkspacesApi.findAll()
	} catch (err) {
		return []
	}
}
