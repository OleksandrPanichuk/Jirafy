'use client'

import { UsersApi } from '@/api'
import { useAuth } from '@/features/auth'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

export const useUpdateCurrentUserMutation = () => {
	const setUser = useAuth((s) => s.setUser)
	return useMutation({
		mutationFn: UsersApi.updateCurrent,
		onSuccess: ({ data }) => {
			setUser(data)
			toast.success('Profile updated successfully')
		}
	})
}
