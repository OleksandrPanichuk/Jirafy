'use server'

import { InvitesApi } from './invites.service'
import { type FindAllUserInvitesInput } from './invites.dto'

export async function getAllUserInvites(input: FindAllUserInvitesInput) {
	try {
		return await InvitesApi.findAllUserInvites(input)
	} catch {
		return []
	}
}
