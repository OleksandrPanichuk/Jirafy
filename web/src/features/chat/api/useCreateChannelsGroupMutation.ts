'use client'

import { useMutation } from '@/hooks'
import { ChannelsApi } from '@/api'
import { toast } from '@/features/toast'
import { useChannelsStore } from '@/features/chat'

export const useCreateChannelsGroupMutation = () => {
	const addGroup = useChannelsStore((s) => s.addGroup)
	return useMutation({
		mutationFn: ChannelsApi.createGroup,
		onSuccess: ({ data }) => {
			addGroup({ ...data, channels: [] })
			toast.success('Group created successfully')
		}
	})
}
