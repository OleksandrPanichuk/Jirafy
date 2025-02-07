'use client'

import { InvitesApi } from '@/api'
import { useMutation } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'

export const useDeleteInviteMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: InvitesApi.delete,
		onSuccess: ({ data }) => {
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
