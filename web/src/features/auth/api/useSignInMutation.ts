'use client'

import { AuthApi } from '@/api'
import { toast } from '@/features/notifications'
import { useMutation } from '@/hooks'
import { useAuth } from '@/features/auth'

export const useSignInMutation = () => {
	const setUser = useAuth((s) => s.setUser)
	return useMutation({
		mutationFn: AuthApi.signIn,
		onSuccess: ({ data }) => {
			toast.success('Signed in successfully')
			setUser(data)
		}
	})
}
