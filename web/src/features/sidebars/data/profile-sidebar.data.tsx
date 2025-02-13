import { Routes } from '@/constants'
import {
	IconActivity,
	IconBell,
	IconBrush,
	IconFingerprint,
	IconUserCircle
} from '@tabler/icons-react'

type ProfileSidebarLink = {
	href: Routes
	text: string
	icon: JSX.Element
	id: number
}

export const profileSidebarLinks = [
	{
		href: Routes.PROFILE,
		text: 'Profile',
		icon: <IconUserCircle className="size-4" />,
		id: 1
	},
	{
		href: Routes.PROFILE_SECURITY,
		text: 'Security',
		icon: <IconFingerprint className="size-4" />,
		id: 2
	},
	{
		href: Routes.PROFILE_ACTIVITY,
		text: 'Activity',
		icon: <IconActivity className="size-4" />,
		id: 3
	},
	{
		href: Routes.PROFILE_APPEARANCE,
		text: 'Appearance',
		icon: <IconBrush className="size-4" />,
		id: 4
	},
	{
		href: Routes.PROFILE_NOTIFICATIONS,
		text: 'Notifications',
		icon: <IconBell className="size-4" />,
		id: 5
	}
] satisfies ProfileSidebarLink[]
