'use client'

import { EmailApi } from '@/api'
import { toast } from '@/features/notifications'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'

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
