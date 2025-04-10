'use client'

import { useMutation } from '@/hooks'
import { useChannelsStore } from '@/features/chat'
import { ChannelsApi } from '@/api'
import { toast } from '@/features/toast'

export const useCreateChannelMutation = () => {
	const addChannel = useChannelsStore((s) => s.addChannel)
	return useMutation({
		mutationFn: ChannelsApi.create,
		onSuccess: ({ data }) => {
			addChannel(data.groupId, data)
			toast.success('Channel created successfully')
		}
	})
}
