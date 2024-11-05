'use client'

import { cn } from '@/lib'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { PropsWithChildren, ReactNode } from 'react'
import { useWorkspaceSidebarStore } from '../store'

interface ISidebarGroupProps extends PropsWithChildren {
	title: string
	action?: ReactNode
	className?: string
}

export const SidebarGroup = ({
	children,
	action,
	title,
	className
}: ISidebarGroupProps) => {
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)

	return (
		<Accordion
			className={cn('!px-0', className)}
			itemClasses={{
				trigger: cn(
					' data-[hover=true]:bg-tw-bg-90 rounded sticky top-0 py-0 px-2 ',
					isCollapsed && 'hidden'
				),
				content: '!p-0 flex flex-col items-center gap-0.5'
			}}
			defaultSelectedKeys={[title]}
			selectedKeys={isCollapsed ? [title] : undefined}
		>
			<AccordionItem
				key={title}
				title={
					<div className="w-full min-h-[27px] flex justify-between items-center text-tw-text-400 text-xs font-semibold">
						<span className="text-[0.675rem] uppercase">{title}</span>
						<div className="flex items-center">{action}</div>
					</div>
				}
			>
				{children}
			</AccordionItem>
		</Accordion>
	)
}
