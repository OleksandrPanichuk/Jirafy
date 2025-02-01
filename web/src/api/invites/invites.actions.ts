'use server'

import { TypeInviteWithWorkspace } from '@/types'
import { InvitesApi } from './invites.service'

export async function getAllInvitesByUserId(
	input: TypeInviteWithWorkspace
) {
	try {
		return await InvitesApi.findAllByUserId(input)
	} catch {
		return []
	}
}
