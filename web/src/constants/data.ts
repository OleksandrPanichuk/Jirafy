import { BreakpointsType } from "@/types"

export const SESSION_COOKIE_NAME = 'chatify-session'
export const OAUTH_DATA_COOKIE_NAME = 'oauth_data'
export const IDENTITY_VERIFIED_COOKIE_NAME = 'identity_verified'


export const breakpoints: Record<BreakpointsType, string> = {
	lg: '(min-width: 1024px)',
	'max-lg': '(max-width: 1023.98px)',
	md: '(min-width: 768px)',
	'max-md': '(max-width: 767.98px)',
	sm: '(min-width: 640px)',
	'max-sm': '(max-width: 639.98px)',
	xs: '(min-width: 440px)',
	'max-xs': '(max-width: 439.98px)'
}