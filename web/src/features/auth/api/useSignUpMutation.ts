'use client'

import { AuthApi } from '@/api'
import { toast } from '@/features/notifications'
import { useMutation } from '@/hooks'
import { useAuth } from '@/features/auth'

export const useSignUpMutation = () => {
	const setUser = useAuth((s) => s.setUser)
	return useMutation({
		mutationFn: AuthApi.signUp,
		onSuccess: ({ data }) => {
			toast.success('Account created successfully')
			setUser(data)
		}
	})
}
