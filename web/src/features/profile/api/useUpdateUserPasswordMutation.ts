'use client'

import { UsersApi } from '@/api'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

export const useUpdateUserPasswordMutation = () => {
	return useMutation({
		mutationFn: UsersApi.updatePassword,
		onSuccess: () => {
			toast.success('Password updated successfully!')
		}
	})
}
