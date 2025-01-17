'use client'

import { EmailApi } from '@/api'
import { useAuth } from '@/features/auth'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

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
