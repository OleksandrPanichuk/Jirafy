'use client'

import { AuthApi } from '@/api'
import { useAuth } from '@/features/auth'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'
import { useSockets } from '@/providers'
import { useRouter } from 'next/navigation'

export const useSignOutMutation = () => {
	const setUser = useAuth((s) => s.setUser)
	const router = useRouter()
	const sockets = useSockets()
	return useMutation({
		mutationFn: AuthApi.signOut,
		onSuccess: () => {
			toast.success('Signed out successfully')

			setUser(null)

			sockets.chat?.disconnect()
			sockets.invites?.disconnect()

			router.refresh()
		}
	})
}
