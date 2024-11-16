'use client'

import {
	ProjectMenu,
	SidebarGroup,
	SidebarItem,
	useWorkspaceSidebarStore
} from '@/features/sidebars'
import { cn } from '@/lib'
import type { TypeProject } from '@/types'
import { Draggable } from '@hello-pangea/dnd'
import {
	IconFileText,
	IconGripVertical,
	IconInnerShadowRight,
	IconSquares,
	IconStack2
} from '@tabler/icons-react'

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
								titleWrapper: 'min-h-[30px] justify-start gap-1.5',
								title: cn(
									'truncate text-sm font-medium text-tw-text-200 flex-1',
									isCollapsed && 'hidden'
								),
								action: cn(isCollapsed && 'hidden'),
								indicator: cn(isCollapsed && 'hidden')
							}}
							action={<ProjectMenu projectId={data.id} />}
							title={data.name}
							emoji={data.emoji}
							uppercase={false}
						>
							{!isCollapsed && (
								<>
									<SidebarItem
										icon={<IconSquares className="size-4" />}
										href=""
										text="Issues"
										classNames={{
											content: 'pl-3'
										}}
									/>
									<SidebarItem
										icon={<IconInnerShadowRight className="size-4" />}
										href=""
										text="Cycles"
										classNames={{
											content: 'pl-3'
										}}
									/>
									<SidebarItem
										icon={<IconStack2 className="size-4" />}
										href=""
										text="Views"
										classNames={{
											content: 'pl-3'
										}}
									/>
									<SidebarItem
										icon={<IconFileText className="size-4" />}
										href=""
										text="Pages"
										classNames={{
											content: 'pl-3'
										}}
									/>
								</>
							)}
						</SidebarGroup>
					</div>
				</li>
			)}
		</Draggable>
	)
}
