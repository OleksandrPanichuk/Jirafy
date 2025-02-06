'use client'

import { InvitesApi } from '@/api'
import { useUserInvitesStore } from '@/features/invites'
import { useMutation } from '@/hooks'
import { useRouter } from 'next/navigation'

export const useAcceptInvites = () => {
	const remove = useUserInvitesStore((s) => s.removeMany)
	const router = useRouter()
	return useMutation({
		mutationFn: InvitesApi.accept,
		onSuccess: ({ data }) => {
			remove(data.map((invite) => invite.id))

			router.refresh()
		}
	})
}
