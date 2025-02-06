'use client'

import { InvitesApi } from '@/api'
import { useAuth } from '@/features/auth'
import { useQuery } from '@/hooks'
import { InviteState, TypeInviteWithWorkspace } from '@/types'

interface Props {
	state?: InviteState
	onSuccess?: (data: TypeInviteWithWorkspace[]) => void
}

export const useUserInvitesQuery = ({ state, onSuccess }: Props = {}) => {
	const userId = useAuth((s) => s.user?.id)
	return useQuery({
		queryKey: ['user-invites'],
		queryFn: () => InvitesApi.findAllUserInvites({ state }),
		enabled: !!userId,
		onSuccess
	})
}
