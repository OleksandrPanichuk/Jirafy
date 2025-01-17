'use client'

import { AuthApi } from '@/api'
import { useAuth } from '@/features/auth'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

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
