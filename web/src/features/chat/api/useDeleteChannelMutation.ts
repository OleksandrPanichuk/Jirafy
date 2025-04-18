'use client'

import { useMutation } from '@/hooks'
import { ChannelsApi } from '@/api'
import { useChannelsStore } from '@/features/chat'
import { toast } from '@/features/toast'

export const useDeleteChannelMutation = () => {
	const removeChannel = useChannelsStore((s) => s.removeChannel)
	return useMutation({
		mutationFn: ChannelsApi.delete,
		onSuccess: (_, channelId) => {
			removeChannel(channelId)
			toast.success('Channel deleted successfully!')
		}
	})
}
