'use client'

import { InvitesApi } from '@/api'
import { useWorkspaceInvitesStore } from '@/features/invites'
import { useMutation } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'

export const useDeleteInviteMutation = () => {
	const queryClient = useQueryClient()
	const removeInvite = useWorkspaceInvitesStore((s) => s.remove)
	return useMutation({
		mutationFn: InvitesApi.delete,
		onSuccess: ({ data }) => {
			removeInvite(data.id)

			queryClient.invalidateQueries({
				queryKey: [
					'workspace-invites',
					{
						workspaceId: data.workspaceId
					}
				]
			})
		}
	})
}
