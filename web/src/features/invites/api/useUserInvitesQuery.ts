'use client'

import { InvitesApi } from '@/api'
import { useAuth } from '@/features/auth'
import { useQuery } from '@/hooks'
import { InviteState, TypeInviteWithUser } from '@/types'

interface Props {
	state?: InviteState
	onSuccess?: (data: TypeInviteWithUser[]) => void
}

export const useUserInvitesQuery = ({ state, onSuccess }: Props = {}) => {
	const userId = useAuth((s) => s.user?.id)
	return useQuery({
		queryKey: ['user-invites'],
		queryFn: () => InvitesApi.findAllByUserId({ userId: userId!, state }),
		enabled: !!userId,
		onSuccess
	})
}
