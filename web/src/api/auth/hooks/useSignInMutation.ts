'use client'

import { AuthApi } from '@/api'
import { toast } from '@/features/notifications'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'

export const useSignInMutation = () => {
	const { setUser } = useAuth()
	return useMutation({
		mutationFn: AuthApi.signIn,
		onSuccess: ({ data }) => {
			toast.success('Signed in successfully')
			setUser(data)
		},
	})
}
