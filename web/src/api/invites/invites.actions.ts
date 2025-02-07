'use server'

import { type FindAllUserInvitesInput } from './invites.dto'
import { InvitesApi } from './invites.service'

export async function getAllUserInvites(input: FindAllUserInvitesInput) {
	try {
		return await InvitesApi.findAllUserInvites(input)
	} catch {
		return []
	}
}
