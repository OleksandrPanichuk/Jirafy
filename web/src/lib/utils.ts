import { APP_URL } from '@/constants/env'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function absoluteApiUrl(url: string = '') {
	return APP_URL + '/api' + url
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
