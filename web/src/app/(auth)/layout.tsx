'use client'
import { Routes } from '@/constants'
import { useAuth } from '@/providers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	const {user} = useAuth()

	if(user) {
		return redirect(Routes.ROOT)
	}
	return (
		<div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black'>
			{children}
		</div>
	)
}

export default AuthLayout
