'use client'

import { FindAllWorkspaceInvitesInput, InvitesApi } from '@/api'
import { useQuery } from '@/hooks'

export const useWorkspaceInvitesQuery = (
	input: FindAllWorkspaceInvitesInput
) => {
	return useQuery({
		queryKey: ['workspace-invites', input],
		queryFn: () => InvitesApi.findAllWorkspaceInvite(input)
	})
}
