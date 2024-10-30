'use client'
import { Routes } from '@/constants'
import { useAuth } from '@/features/auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
	const user = useAuth((s) => s.user)
	if (!user) {
		return redirect(Routes.SIGN_IN)
	}

	if (!user.verified) {
		return redirect(Routes.VERIFY_EMAIL)
	}

	return <>{children}</>
}
