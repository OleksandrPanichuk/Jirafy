export const Routes = {
	ROOT: '/',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',
	VERIFY_EMAIL: '/verify-email',
	CHANGE_EMAIL: '/change-email',
	CREATE_WORKSPACE: '/create-workspace',
	INVITATIONS: '/invitations',

	NOT_IMPLEMENTED: '/not-implemented',

	PROFILE: '/profile',
	PROFILE_SECURITY: '/profile/security',
	PROFILE_ACTIVITY: '/profile/activity',
	PROFILE_APPEARANCE: '/profile/appearance',
	PROFILE_NOTIFICATIONS: '/profile/notifications',

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
	WORKSPACE_INVITES: (slug: string) => `/${slug}/settings/invites`,
	WORKSPACE_BILLING: (slug: string) => `/${slug}/settings/billing`,
	WORKSPACE_PROJECTS: (slug: string) => `/${slug}/projects`,
	WORKSPACE_VIEWS_ALL: (slug: string) => `/${slug}/workspace-views/all-issues`,
	WORKSPACE_ANALYTICS: (slug: string) => `/${slug}/analytics`,
	WORKSPACE_AI: (slug: string) => `/${slug}/ai`,
	WORKSPACE_CHAT: (slug: string) => `/${slug}/chat`,
	WORKSPACE_MEMBER: (slug: string, userId: string) =>
		`/${slug}/members/${userId}`
} as const

export type Routes = (typeof Routes)[keyof typeof Routes]

export const ApiRoutes = {
	AUTH: {
		SIGN_IN: '/auth/sign-in',
		SIGN_UP: '/auth/sign-up',
		GOOGLE: '/api/auth/sign-in/google',
		GITHUB: '/api/auth/sign-in/github',
		FORGOT_PASSWORD: '/auth/password/send-token',
		RESET_PASSWORD: '/auth/password/reset',
		VERIFY_RESET_PASSWORD_TOKEN: '/auth/password/verify-token',
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
		CURRENT: '/users/current',
		CURRENT_PASSWORD: '/users/current/password'
	},
	WORKSPACES: {
		ROOT: '/workspaces',
		ALL: '/workspaces/all',
		SELECT: '/workspaces/select',
		BY_ID: (id: string) => `/workspaces/${id}`
	},
	PROJECTS: {
		ROOT: '/projects',
		BY_WORKSPACE_SLUG: (slug: string) => `/projects/by-workspace-slug/${slug}`,
		BY_WORKSPACE_SLUG_WITH_FILTERS: (slug: string) =>
			`/projects/by-workspace-slug/${slug}/with-filters`,
		REORDER: '/projects/reorder'
	},
	STORAGE: {
		ROOT: '/storage',
		UPLOAD: '/storage/upload',
		UPLOAD_BY_DATA_URL: '/storage/upload/data-url',
		DELETE: (key: string) => `/storage/delete/${key}`
	},
	MEMBERS: {
		ROOT: '/members',
		BY_WORKSPACE_SLUG: (slug: string) => `/members/by-workspace-slug/${slug}`,
		BY_ID: (id: string) => `/members/${id}`,
		BY_ID_ROLE: (id: string) => `/members/${id}/role`
	},
	FAVORITES: {
		ROOT: '/favorites',
		BY_WORKSPACE_SLUG: (slug: string) => `/favorites/by-workspace-slug/${slug}`
	},
	INVITES: {
		ROOT: '/invites',
		USER: '/invites/user',
		WORKSPACE: '/invites/workspace',
		ACCEPT: '/invites/accept',
		REJECT: '/invites/reject',
		BY_ID: (id: string) => `/invites/${id}`
	}
} as const
