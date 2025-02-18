'use client'

import { useAuth } from '@/features/auth'
import { Control, useWatch } from 'react-hook-form'
import { FormValues } from '.'

interface IUserInfoProps {
	control: Control<FormValues>
}

export const UserInfo = ({ control }: IUserInfoProps) => {
	const user = useAuth((s) => s.user)!
	
	const firstName = useWatch({
		name: 'firstName',
		defaultValue: user.firstName,
		control
	})

	const lastName = useWatch({
		name: 'lastName',
		defaultValue: user.lastName,
		control
	})

	return (
		<>
			<h2 className="item-center flex text-lg font-medium text-tw-text-200">
				{firstName} {lastName}
			</h2>
			<p className="text-sm text-tw-text-300 tracking-tight">{user.email}</p>
		</>
	)
}
