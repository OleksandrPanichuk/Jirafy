'use client'

import { AuthApi } from '@/api'
import { toast } from '@/features/notifications'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'

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
