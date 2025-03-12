'use client'

import { useWorkspaceSidebarStore } from '@/features/sidebars'
import { cn } from '@/lib'
import { Accordion, AccordionItem } from "@heroui/react"
import Link from 'next/link'
import { PropsWithChildren, ReactNode } from 'react'

interface ISidebarGroupProps extends PropsWithChildren {
	title: string
	action?: ReactNode
	className?: string
	onTitleClick?: () => void
	emoji?: string
	emojiLink?: string
	classNames?: {
		trigger?: string
		content?: string
		titleWrapper?: string
		title?: string
		emoji?: string
		action?: string
		indicator?: string
	}
	uppercase?: boolean
	shouldBeOpenWhenCollapsed?: boolean
}

export const SidebarGroup = ({
	children,
	action,
	title,
	className,
	classNames,
	onTitleClick,
	emoji,
	emojiLink,
	uppercase = true,
	shouldBeOpenWhenCollapsed = true
}: ISidebarGroupProps) => {
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)

	return (
		<Accordion
			className={cn('!px-0', className)}
			itemClasses={{
				trigger: cn(
					' data-[hover=true]:bg-tw-bg-90 rounded sticky top-0 py-0 px-2  gap-1',
					isCollapsed ? 'hidden' : 'mt-2.5',
					classNames?.trigger
				),
				content: cn(
					'!p-0 flex flex-col items-center gap-0.5',
					classNames?.content
				),
				indicator: classNames?.indicator
			}}
			defaultSelectedKeys={undefined}
			selectedKeys={
				isCollapsed && shouldBeOpenWhenCollapsed ? [title] : undefined
			}
		>
			<AccordionItem
				key={title}
				title={
					<div
						onClick={onTitleClick}
						className={cn(
							'w-full min-h-[27px] flex justify-between items-center text-tw-text-400 text-xs font-semibold',
							classNames?.titleWrapper
						)}
					>
						{emoji &&
							(emojiLink ? (
								<Link href={emojiLink} className={cn(classNames?.emoji)}>
									{emoji}
								</Link>
							) : (
								<span className={cn(classNames?.emoji)}>{emoji}</span>
							))}

						<span
							className={cn(
								'text-[0.675rem]',
								uppercase && 'uppercase',
								classNames?.title
							)}
						>
							{title}
						</span>
						<div className={cn('flex items-center', classNames?.action)}>
							{action}
						</div>
					</div>
				}
			>
				{children}
			</AccordionItem>
		</Accordion>
	)
}
