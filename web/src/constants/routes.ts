export const Routes = {
	ROOT: '/',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	FORGET_PASSWORD: '/forget-password',
	RESET_PASSWORD: '/reset-password',
	VERIFY_EMAIL: '/verify-email',
	CHANGE_EMAIL: '/change-email'
} as const

export const ApiRoutes = {
	AUTH: {
		SIGN_IN: '/auth/sign-in',
		SIGN_UP: '/auth/sign-up',
		GOOGLE: '/api/auth/sign-in/google',
		GITHUB: '/api/auth/sign-in/github',
		FORGOT_PASSWORD: '/auth/forgot-password',
		RESET_PASSWORD: '/auth/reset-password',
		SIGN_OUT: '/auth/sign-out',
		VERIFY_IDENTITY: '/auth/verify-identity'
	},
	EMAIL: {
		SEND_LINK: '/auth/email/send-link',
		VERIFY: '/auth/email/verify',
		CHANGE: '/auth/email/change'
	},
	USERS: {
		ROOT: '/users',
		CURRENT: '/users/current'
	}
} as const
