'use client'

import {} from '@/features/workspaces'
import { cn } from '@/lib'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { PropsWithChildren, ReactNode } from 'react'
import { useWorkspaceSidebarStore } from '../store'

interface ISidebarGroupProps extends PropsWithChildren {
	title: string
	action?: ReactNode
	className?: string
	onTitleClick?: () => void
	emoji?: string
	classNames?: {
		trigger?: string
		content?: string
		titleWrapper?: string
		title?: string
		emoji?: string
		action?: string
		indicator?:string
	}
	uppercase?:boolean
}

export const SidebarGroup = ({
	children,
	action,
	title,
	className,
	classNames,
	onTitleClick,
	emoji,
	uppercase = true
}: ISidebarGroupProps) => {
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)

	return (
		<Accordion
			className={cn('!px-0', className)}
			itemClasses={{
				trigger: cn(
					' data-[hover=true]:bg-tw-bg-90 rounded sticky top-0 py-0 px-2 ',
					isCollapsed ? 'hidden' : 'mt-2.5',
					classNames?.trigger
				),
				content: cn(
					'!p-0 flex flex-col items-center gap-0.5',
					classNames?.content
				),
				indicator: classNames?.indicator
				
			}}
			defaultSelectedKeys={[title]}
			selectedKeys={isCollapsed ? [title] : undefined}
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
						{emoji && <span className={cn(classNames?.emoji)}>{emoji}</span>}
						<span
							className={cn('text-[0.675rem]', uppercase && 'uppercase', classNames?.title)}
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
