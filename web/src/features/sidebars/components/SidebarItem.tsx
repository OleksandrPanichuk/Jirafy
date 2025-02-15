'use client'

import { cn } from '@/lib'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

interface ISidebarItemProps {
	icon: ReactNode
	text: string
	href: string
	action?: ReactNode
	isCollapsed?: boolean
	classNames?: {
		base?: string
		container?: string
		text?: string
		content?: string
	}
}

export const SidebarItem = ({
	text,
	classNames,
	isCollapsed,
	href,
	icon,
	action
}: ISidebarItemProps) => {
	const pathname = usePathname()
	const isActive = useMemo(() => {
		return pathname === href
	}, [href, pathname])

	return (
		<Tooltip
			hidden={!isCollapsed}
			content={<span className="text-sm">{text}</span>}
			placement="right"
		>
			<Link
				href={href}
				className={cn(!isCollapsed && 'w-full', classNames?.base)}
			>
				<div
					className={cn(
						'cursor-pointer relative group w-full flex items-center justify-between gap-1.5 rounded px-2 py-1 outline-none',
						isCollapsed ? 'w-min aspect-square' : 'w-full',
						isActive
							? 'text-tw-primary-200 bg-[#3F76FF1A]'
							: 'text-tw-text-200 hover:bg-tw-bg-90 active:bg-tw-bg-90',
						classNames?.container
					)}
				>
					<div
						className={cn(
							'flex items-center gap-1.5 py-[1px]',
							classNames?.content
						)}
					>
						{icon}
						{!isCollapsed && (
							<>
								<p
									className={cn(
										'text-xs leading-5 font-medium',
										classNames?.text
									)}
								>
									{text}
								</p>
								{action}
							</>
						)}
					</div>
				</div>
			</Link>
		</Tooltip>
	)
}
