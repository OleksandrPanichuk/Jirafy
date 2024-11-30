export const Routes = {
	ROOT: '/',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	FORGET_PASSWORD: '/forget-password',
	RESET_PASSWORD: '/reset-password',
	VERIFY_EMAIL: '/verify-email',
	CHANGE_EMAIL: '/change-email',
	CREATE_WORKSPACE: '/create-workspace',
	INVITATIONS: '/invitations',

	PROFILE_SETTINGS: '/profile/settings',

	YOUR_WORK: (slug: string, userId: string) => `/${slug}/profile/${userId}`,
	NOTIFICATIONS: (slug: string) => `/${slug}/notifications`,

	PROJECT_ISSUES: (slug: string, projectId: string) =>
		`/${slug}/projects/${projectId}/issues`,
	PROJECT_SETTINGS: (slug: string, projectId: string) =>
		`/${slug}/projects/${projectId}/settings`,
	PROJECT_CYCLES: (slug: string, projectId: string) =>
		`/${slug}/projects/${projectId}/cycles`,
	PROJECT_VIEWS: (slug: string, projectId: string) =>
		`/${slug}/projects/${projectId}/views`,
	PROJECT_PAGES: (slug: string, projectId: string) =>
		`/${slug}/projects/${projectId}/pages`,

	WORKSPACE_BY_SLUG: (slug: string) => `/${slug}`,
	WORKSPACE_SETTINGS: (slug: string) => `/${slug}/settings`,
	WORKSPACE_EXPORTS: (slug: string) => `/${slug}/settings/exports`,
	WORKSPACE_MEMBERS: (slug: string) => `/${slug}/settings/members`,
	WORKSPACE_BILLING: (slug: string) => `/${slug}/settings/billing`,
	WORKSPACE_PROJECTS: (slug: string) => `/${slug}/projects`,
	WORKSPACE_VIEWS_ALL: (slug: string) => `/${slug}/workspace-views/all-issues`,
	WORKSPACE_ANALYTICS: (slug: string) => `/${slug}/analytics`,
	WORKSPACE_CHAT: (slug: string) => `/${slug}/chat`
} as const

export type Routes = (typeof Routes)[keyof typeof Routes]

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
	},
	WORKSPACES: {
		ROOT: '/workspaces',
		ALL: '/workspaces/all',
		SELECT: '/workspaces/select',
		BY_ID: (id: string) => `/workspaces/${id}`,
	},
	PROJECTS: {
		ROOT: '/projects',
		BY_WORKSPACE_SLUG: (slug: string) => `/projects/by-workspace-slug/${slug}`,
		REORDER: '/projects/reorder'
	},
	STORAGE: {
		ROOT: '/storage',
		UPLOAD: '/storage/upload',
		DELETE: (key: string) => `/storage/delete/${key}`
	},
	MEMBERS: {
		ROOT: '/members',
		BY_WORKSPACE_SLUG: (slug: string) => `/members/by-workspace-slug/${slug}`
	},
	FAVORITES: {
		ROOT: '/favorites',
		BY_WORKSPACE_SLUG: (slug: string) => `/favorites/by-workspace-slug/${slug}`
	}
} as const
