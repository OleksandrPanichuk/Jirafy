'use client'

import { cn } from '@/lib'
import { Tooltip } from '@heroui/react'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

interface ISidebarItemProps {
	icon: ReactNode
	text: string
	href: string
	action?: ReactNode
	isFullLink?: boolean
	isCollapsed?: boolean
	variant?: 'default' | 'compact'
	activeVariant?: 'equal' | 'contains'
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
	action,
	isFullLink = true,
	variant = 'default',
	activeVariant = 'equal'
}: ISidebarItemProps) => {
	const pathname = usePathname()
	const router = useRouter()
	const isActive = useMemo(() => {
		return activeVariant === 'equal'
			? pathname === href
			: pathname.includes(href)
	}, [href, pathname, activeVariant])

	const WrapperComp = isFullLink ? Link : 'div'
	const TextComp = !isFullLink ? Link : 'p'

	const onWrapperClick = () => {
		if (!isFullLink) {
			router.push(href)
		}
	}

	const isCompact = variant === 'compact' || isCollapsed

	return (
		<Tooltip
			hidden={!isCompact}
			content={<span className="text-sm">{text}</span>}
			placement="right"
		>
			<WrapperComp
				href={isFullLink ? href : '#'}
				className={cn(!isCompact && 'w-full', classNames?.base)}
				onClick={onWrapperClick}
			>
				<div
					className={cn(
						'cursor-pointer relative group w-full flex items-center justify-between gap-1.5 rounded px-2 py-1 outline-none',
						isCompact ? 'w-min aspect-square' : 'w-full',
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
						{!isCompact && (
							<>
								<TextComp
									href={!isFullLink ? href : '#'}
									className={cn(
										'text-xs leading-5 font-medium',
										classNames?.text
									)}
								>
									{text}
								</TextComp>
								{action}
							</>
						)}
					</div>
				</div>
			</WrapperComp>
		</Tooltip>
	)
}
