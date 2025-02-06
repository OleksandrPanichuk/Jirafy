import { InvitesApi, WorkspacesApi } from '@/api'
import { useUserInvitesStore } from '@/features/invites'
import { toast } from '@/features/toast'
import { useWorkspacesStore } from '@/features/workspaces'
import { useLazyQuery, useMutation } from '@/hooks'

export const useAcceptInvites = () => {
	const removeInvites = useUserInvitesStore((s) => s.removeMany)
	const setWorkspaces = useWorkspacesStore((s) => s.setWorkspaces)

	const { fetchData } = useLazyQuery({
		queryFn: WorkspacesApi.findAll,
		queryKey: ['workspaces']
	})

	return useMutation({
		mutationFn: InvitesApi.accept,
		onSuccess: async ({ data }) => {
			removeInvites(data.map((invite) => invite.id))
			try {
				const workspaces = await fetchData()

				if (!workspaces) {
					return
				}

				setWorkspaces(workspaces)
			} catch {
				toast.error('Failed to fetch workspaces. Reloading window')
				window.location.reload()
			}
		}
	})
}
