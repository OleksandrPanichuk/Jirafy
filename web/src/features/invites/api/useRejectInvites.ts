import { InvitesApi } from '@/api'
import { useUserInvitesStore } from '@/features/invites'
import { useMutation } from '@/hooks'

export const useRejectInvites = () => {
	const remove = useUserInvitesStore((s) => s.removeMany)
	return useMutation({
		mutationFn: InvitesApi.reject,
		onSuccess: ({ data }) => {
			remove(data.map((invite) => invite.id))
		}
	})
}
