'use client'

import { breakpoints } from '@/constants'
import {
	getSettingsLinks,
	useCurrentWorkspaceSlug
} from '@/features/workspaces'
import { useMediaQuery } from '@/hooks'
import { cn } from '@/lib'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'


export const WorkspaceSettingsNavigation = () => {
	const slug = useCurrentWorkspaceSlug()
	const routes = useMemo(() => getSettingsLinks(slug), [slug])
	const pathname = usePathname()

	const [isMobile] = useMediaQuery(breakpoints['max-md'])

	const active = useMemo(() => {
		return routes.find((route) => route.href === pathname)
	}, [pathname, routes])

	if (isMobile) {
		return null
	}

	return (
		<div className={'min-w-[280px] hidden md:block'}>
			<span className={'text-xs font-semibold text-tw-text-400 uppercase'}>
				Settings
			</span>
			<nav>
				<ul className={'flex flex-col gap-1'}>
					{routes.map((route) => (
						<li
							className={cn(
								'hover:bg-tw-bg-90  text-tw-text-200 font-medium text-sm  rounded cursor-pointer transition-all',
								active?.href === route.href &&
									'!bg-[#3f76ff1a] text-tw-primary-200'
							)}
							key={route.href}
						>
							<Link className={'w-full py-2 px-4 block'} href={route.href}>
								{route.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}

export const WorkspaceSettingsNavigationMobile = () => {
	const slug = useCurrentWorkspaceSlug()
	const pathname = usePathname()
	const routes = useMemo(() => getSettingsLinks(slug), [slug])
	const [isMobile] = useMediaQuery(breakpoints['max-md'])

	const active = useMemo(() => {
		return routes.find((route) => route.href === pathname)
	}, [pathname, routes])

	if (!isMobile) {
		return null
	}

	return (
		<div className="w-screen overflow-auto  md:hidden flex">
			{routes.map((route) => (
				<Link
					key={route.href}
					className={cn(
						'border-b border-tw-border-200 w-full py-2 px-4 text-tw-text-200 text-sm flex-grow items-center justify-center flex ',
						active?.href === route.href &&
							'border-tw-primary-100 text-tw-primary-100'
					)}
					href={route.href}
				>
					{route.label}
				</Link>
			))}
		</div>
	)
}
