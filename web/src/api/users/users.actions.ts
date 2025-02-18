'use server'

import { UsersApi } from '@/api'
import { SESSION_COOKIE_NAME } from '@/constants'
import { TypeUser } from '@/types'
import { cookies } from 'next/headers'

export const currentUser = async (): Promise<TypeUser | null> => {
	let user: TypeUser | null = null
	try {
		const { has } = await cookies()

		if (has(SESSION_COOKIE_NAME)) {
			user = await UsersApi.current()
		}
	} finally {
		return user
	}
}
