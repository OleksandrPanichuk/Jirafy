'use client'

import { AuthApi } from '@/api'
import { useVerifyIdentityStore } from '@/features/auth'
import { useMutation } from '@/hooks'

export const useVerifyIdentityMutation = () => {
	const { setIsIdentityVerified } = useVerifyIdentityStore((s) => s)
	return useMutation({
		mutationFn: AuthApi.verifyIdentity,
		onSuccess: ({ data }) => {
			if (data) {
				setIsIdentityVerified(true)
			}
		}
	})
}
