'use client'

import { useMutation } from '@/hooks'
import { AuthApi } from '@/api'
import { useRouter } from 'next-nprogress-bar'
import { Routes } from '@/constants'
import { toast } from '@/features/toast'

export const useResetPasswordMutation = () => {
	const router = useRouter()
	return useMutation({
		mutationFn: AuthApi.resetPassword,
		onSuccess: () => {
			toast.success('Password was reset successfully')
			router.push(Routes.SIGN_IN)
		}
	})
}
