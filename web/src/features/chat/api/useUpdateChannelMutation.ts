'use client'

import { ChannelsApi } from '@/api'
import { useChannelsStore } from '@/features/chat'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

export const useUpdateChannelMutation = () => {
	const updateChannel = useChannelsStore((s) => s.updateChannel)
	return useMutation({
		mutationFn: ChannelsApi.update,
		onSuccess: ({ data }) => {
			updateChannel(data.id, data)
			toast.success('Channel updated successfully')
		}
	})
}
