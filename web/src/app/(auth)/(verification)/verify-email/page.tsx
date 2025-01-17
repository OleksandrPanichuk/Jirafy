'use client'

import { Routes } from '@/constants'
import {
	useAuth,
	UserMenu,
	useVerifyEmailMutation,
	VerificationCard,
	VerificationProcess
} from '@/features/auth'
import { toast } from '@/features/toast'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const router = useRouter()

	const { user, setUser } = useAuth((s) => s)

	const { mutate: verifyEmail, isPending: isVerifying } =
		useVerifyEmailMutation({
			onSuccess: () => {
				setUser({
					...user!,
					verified: true
				})
			},
			onError: () => {
				toast.error('Failed to verify email')

				router.replace(Routes.VERIFY_EMAIL)
			}
		})

	useEffect(() => {
		if (token) {
			verifyEmail({ token })
		}
	}, [token, verifyEmail])

	if (!user) {
		return redirect(Routes.ROOT)
	}

	if (isVerifying || token) {
		return <VerificationProcess />
	}

	return (
		<div className="p-4 md:p-8">
			<div className="max-w-screen-xl">
				<div className="flex justify-end w-full">
					<UserMenu />
				</div>
			</div>
			<div
				className={
					'w-full mx-auto mt-32 flex justify-center items-center max-w-lg'
				}
			>
				<VerificationCard />
			</div>
		</div>
	)
}
