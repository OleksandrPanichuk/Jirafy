export const Routes = {
	ROOT: '/',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	FORGET_PASSWORD: '/forget-password',
	RESET_PASSWORD: '/reset-password',
} as const

export const ApiRoutes = {
	AUTH: {
		SIGN_IN: '/auth/sign-in',
		SIGN_UP: '/auth/sign-up',
		GOOGLE: '/api/auth/sign-in/google',
		GITHUB: '/api/auth/sign-in/github',
		FORGOT_PASSWORD: '/auth/forgot-password',
		RESET_PASSWORD: '/auth/reset-password',
		VERIFY: '/auth/verify',
	},
} as const
