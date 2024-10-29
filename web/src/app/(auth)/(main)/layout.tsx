'use client'

import { Routes } from '@/constants'
import { useAuth } from '@/providers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
	const user = useAuth((s) => s.user)
	if (user && !user.verified) {
		return redirect(Routes.VERIFY_EMAIL)
	}
	return <div className="max-w-lg w-full mx-auto  p-4 md:p-8">{children}</div>
}

export default Layout
