'use client'

import { useVerifyIdentityStore } from '@/features/auth'

export const ChangeEmailForm = () => {
	const { isIdentityVerified } = useVerifyIdentityStore()

	if (!isIdentityVerified) {
		return null
	}
	return <div>ChangeEmailForm</div>
}
