'use client'

import { MembersApi } from '@/api'
import { toast } from '@/features/notifications'
import { useMutation } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'

export const useDeleteMemberMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: MembersApi.delete,
		onSuccess: () => {
			toast.success('Member deleted successfully')

			queryClient.invalidateQueries({
				queryKey: ['members', 'all']
			})
		}
	})
}
