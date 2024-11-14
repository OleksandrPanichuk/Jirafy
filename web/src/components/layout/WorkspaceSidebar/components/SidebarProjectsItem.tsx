'use client'

import { cn } from '@/lib'
import type { TypeProject } from '@/types'
import { Draggable } from '@hello-pangea/dnd'
import { IconGripVertical, IconSquares } from '@tabler/icons-react'
import { useWorkspaceSidebarStore } from '../store'
import { SidebarGroup } from './SidebarGroup'
import { SidebarItem } from './SidebarItem'

interface ISidebarProjectsItemProps {
	data: TypeProject
	index: number
}

export const SidebarProjectsItem = ({
	data,
	index
}: ISidebarProjectsItemProps) => {
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)
	return (
		<Draggable draggableId={data.id} index={index} isDragDisabled={isCollapsed}>
			{(provided) => (
				<li
					{...provided.draggableProps}
					ref={provided.innerRef}
					className="w-full relative"
				>
					<div className="w-full relative" {...provided.dragHandleProps}>
						{!isCollapsed && (
							<div className="absolute top-[13.5px] left-[-12px] translate-y-[-50%] ">
								<IconGripVertical className="size-4 text-tw-text-300" />
							</div>
						)}
						<SidebarGroup
							classNames={{
								trigger: cn(isCollapsed && '!flex !size-8'),
								title: cn(isCollapsed && 'hidden'),
								action: cn(isCollapsed && 'hidden'),
								indicator: cn(isCollapsed && 'hidden')
							}}
							title={data.name}
							emoji={data.emoji}
							uppercase={false}
						>
							{!isCollapsed && (
								<SidebarItem
									icon={<IconSquares className="size-4" />}
									href=""
									text="Issues"
									classNames={{
										content: 'pl-3'
									}}
								/>
							)}
						</SidebarGroup>
					</div>
				</li>
			)}
		</Draggable>
	)
}
