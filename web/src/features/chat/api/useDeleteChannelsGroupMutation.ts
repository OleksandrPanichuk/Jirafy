'use client'

import { ChannelsApi } from '@/api'
import { useChannelsStore } from '@/features/chat'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

export const useDeleteChannelsGroupMutation = () => {
	const removeGroup = useChannelsStore((s) => s.removeGroup)
	return useMutation({
		mutationFn: ChannelsApi.deleteGroup,
		onSuccess: (_, groupId) => {
			removeGroup(groupId)
			toast.success('Channels group deleted successfully')
		}
	})
}
