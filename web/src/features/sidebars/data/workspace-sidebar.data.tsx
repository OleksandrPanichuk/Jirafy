import { Routes } from '@/constants'
import { IconBriefcase, IconBulb, IconChartBar, IconMessage, IconStack2 } from '@tabler/icons-react'
import { ReactNode } from 'react'

type WorkspaceSidebarLink = {
	text: string
	href: string
	icon: ReactNode
}

export const getWorkspaceSidebarLinks = (slug: string): WorkspaceSidebarLink[] => [
	{
		href: Routes.WORKSPACE_PROJECTS(slug),
		text: 'Projects',
		icon: <IconBriefcase className="size-4" />
	},
	{
		href: Routes.WORKSPACE_VIEWS_ALL(slug),
		text: 'Views',
		icon: <IconStack2 className="size-4" />
	},
	{
		href: Routes.WORKSPACE_CHAT(slug),
		text: 'Chat',
		icon: <IconMessage className="size-4" />
	},
	{
		href: Routes.WORKSPACE_AI(slug),
		text: 'AI',
		icon: <IconBulb className="size-4" />
	},
	{
		href: Routes.WORKSPACE_ANALYTICS(slug),
		text: 'Analytics',
		icon: <IconChartBar className="size-4" />
	}
]
