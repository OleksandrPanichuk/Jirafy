'use client'

import { InvitesApi } from '@/api'
import { useMutation } from '@/hooks'
import { useUserInvitesStore } from '@/features/invites'

export const useRejectInvites = () => {
	const remove = useUserInvitesStore((s) => s.removeMany)

	return useMutation({
		mutationFn: InvitesApi.reject,
		onSuccess: ({ data }) => {
			remove(data.map((invite) => invite.id))
		}
	})
}
