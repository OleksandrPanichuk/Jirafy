import { APP_DOMAIN, APP_URL } from '@/constants/env'
import { MemberRole } from '@/types'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function absoluteApiUrl(url: string = '') {
	return APP_URL + '/api' + url
}

export function absoluteUrl(url: string = '') {
	return APP_URL + url
}

export function domainUrl(url: string = '') {
	return APP_DOMAIN + url
}

export function mergeRefs<T = unknown>(...refs: React.Ref<T>[]) {
	return (value: T) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value)
			} else if (ref) {
				;(ref as React.MutableRefObject<T | null>).current = value
			}
		})
	}
}

export function checkMemberPermissions(role: MemberRole) {
	return role === MemberRole.ADMIN || role === MemberRole.OWNER
}

export function parseJSON<T>(value: string | null): T | undefined {
	try {
		return value === 'undefined' ? undefined : JSON.parse(value ?? '')
	} catch {
		console.log('parsing error on', { value })
		return undefined
	}
}
