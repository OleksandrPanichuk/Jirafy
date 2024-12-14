'use client'

import {
	getSettingsLinks,
	useCurrentWorkspaceSlug
} from '@/features/workspaces'
import { useMemo } from 'react'
import { cn } from '@/lib'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const WorkspaceSettingsNavigation = () => {
	const slug = useCurrentWorkspaceSlug()
	const routes = useMemo(() => getSettingsLinks(slug), [slug])
	const pathname = usePathname()

	const active = useMemo(() => {
		return routes.find((route) => route.href === pathname)
	}, [pathname, routes])

	return (
		<div className={'w-[280px]'}>
			<span className={'text-xs font-semibold text-tw-text-400 uppercase'}>
				Settings
			</span>
			<nav>
				<ul className={'flex flex-col gap-1'}>
					{routes.map((route) => (
						<li
							className={cn(
								'hover:bg-tw-bg-90  text-tw-text-200 font-medium text-sm py-2 px-4 rounded cursor-pointer transition-all',
								active?.href === route.href &&
									'!bg-[#3f76ff1a] text-tw-primary-200'
							)}
							key={route.href}
						>
							<Link href={route.href}>{route.label}</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
