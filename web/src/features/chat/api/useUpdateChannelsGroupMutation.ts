'use client'

import { ChannelsApi } from '@/api'
import { useChannelsStore } from '@/features/chat'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

export const useUpdateChannelsGroupMutation = () => {
	const updateGroup = useChannelsStore((s) => s.updateGroup)
	return useMutation({
		mutationFn: ChannelsApi.updateGroup,
		onSuccess: ({ data }) => {
			updateGroup(data.id, data)
			toast.success('Group updated successfully')
		}
	})
}
