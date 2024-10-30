'use client'

import { EmailApi } from '@/api'
import { toast } from '@/features/notifications'
import { useMutation } from '@/hooks'
import { useAuth } from '@/features/auth'

export const useChangeEmailMutation = () => {
	const setUser = useAuth((s) => s.setUser)
	return useMutation({
		mutationFn: EmailApi.changeEmail,
		onSuccess: ({ data }) => {
			toast.success('Email changed successfully')
			setUser(data)
		}
	})
}
