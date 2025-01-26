import { APP_DOMAIN, APP_URL } from '@/constants/env'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { MemberRole } from '@/types'

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
