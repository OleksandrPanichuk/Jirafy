'use client'

import { FindAllWorkspaceInvitesInput, InvitesApi } from '@/api'
import { useWorkspaceInvitesStore } from '@/features/invites'
import { useQuery } from '@/hooks'

export const useWorkspaceInvitesQuery = (
	input: FindAllWorkspaceInvitesInput
) => {
	const setInvites = useWorkspaceInvitesStore((s) => s.set)
	return useQuery({
		queryKey: ['workspace-invites', input],
		queryFn: () => InvitesApi.findAllWorkspaceInvite(input),
		onSuccess: (invites) => {
			console.log('CALL')
			setInvites(invites)
		}
	})
}
