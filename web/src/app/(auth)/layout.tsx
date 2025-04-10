'use client'
import { Routes } from '@/constants'
import { useAuth } from '@/features/auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren, Suspense } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	const user = useAuth((s) => s.user)

	if (user?.verified) {
		return redirect(Routes.ROOT)
	}

	return <Suspense>{children}</Suspense>
}

export default AuthLayout
