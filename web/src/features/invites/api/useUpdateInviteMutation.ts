'use client'

import { InvitesApi } from '@/api'
import { useWorkspaceInvitesStore } from '@/features/invites'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateInviteMutation = () => {
	const queryClient = useQueryClient()
	const updateInvite = useWorkspaceInvitesStore(s => s.update)
	return useMutation({
		mutationFn: InvitesApi.update,
		onSuccess: ({ data }) => {
			updateInvite(data.id, data)

			queryClient.invalidateQueries({
				queryKey: [
					'workspace-invites',
					{
						workspaceId: data.workspaceId
					}
				]
			})

			toast.success('Invite updated successfully')
		}
	})
}
