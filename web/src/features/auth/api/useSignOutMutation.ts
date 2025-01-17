'use client'

import { AuthApi } from '@/api'
import { useAuth } from '@/features/auth'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

export const useSignOutMutation = () => {
	const setUser = useAuth((s) => s.setUser)
	return useMutation({
		mutationFn: AuthApi.signOut,
		onSuccess: () => {
			toast.success('Signed out successfully')
			setUser(null)
		}
	})
}
