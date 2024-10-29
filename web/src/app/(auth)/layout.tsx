'use client'
import { Routes } from '@/constants'
import { useAuth } from '@/providers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	const user = useAuth((s) => s.user)

	if (user?.verified) {
		return redirect(Routes.ROOT)
	}

	return <>{children}</>
}

export default AuthLayout
