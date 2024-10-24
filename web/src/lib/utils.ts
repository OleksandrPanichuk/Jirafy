import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function absoluteApiUrl(url: string = '') {
	return process.env.NEXT_PUBLIC_APP_URL + '/api' + url
}
