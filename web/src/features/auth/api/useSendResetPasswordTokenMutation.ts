'use client'

import { useMutation } from '@/hooks'
import { AuthApi } from '@/api'
import { toast } from '@/features/toast'

export const useSendResetPasswordTokenMutation = () => {
	return useMutation({
		mutationFn: AuthApi.sendResetPasswordToken,
		onSuccess: () => {
			toast.success('Check your email for the reset password link')
		}
	})
}
