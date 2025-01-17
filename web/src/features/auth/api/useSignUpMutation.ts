'use client'

import { AuthApi } from '@/api'
import { useAuth } from '@/features/auth'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

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
