'use server'

import { cookies } from 'next/headers'

export async function getCookie(key: string) {
	const { get } = await cookies()
	const cookie = get(key)
	return cookie?.value
}

export async function getCookiesString() {
	const { toString } = await cookies()
	return toString()
}
