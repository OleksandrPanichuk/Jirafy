import { Routes } from '@/constants'

export const getSettingsLinks = (slug: string) =>
	[
		{
			href: Routes.WORKSPACE_SETTINGS(slug),
			label: 'General'
		},
		{
			href: Routes.WORKSPACE_MEMBERS(slug),
			label: 'Members'
		},
		{
			href: Routes.WORKSPACE_BILLING(slug),
			label: 'Billing'
		},
		{
			href: Routes.WORKSPACE_EXPORTS(slug),
			label: 'Exports'
		}
	] satisfies {
		href: string
		label: string
	}[]
