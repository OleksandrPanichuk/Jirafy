'use client'

import {
	CreateProjectModal,
	useCreateProjectModalStore,
	useProjectsStore
} from '@/features/projects'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { Button, Tooltip } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useWorkspaceSidebarStore } from '../store'
import { SidebarGroup } from './SidebarGroup'
import { SidebarProjectsItem } from './SidebarProjectsItem'

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

export const SidebarProjects = () => {
	const projects = useProjectsStore((s) => s.projects)
	const setProjects = useProjectsStore((s) => s.setProjects)
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)

	const open = useCreateProjectModalStore((s) => s.open)

	const onDragEnd = (result: DropResult) => {
		const { destination, source, type } = result

		if (!destination) {
			return
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		if (type === 'list') {
			const items = reorder(projects, source.index, destination.index).map(
				(item, index) => ({
					...item,
					members: item.members.map((m) => ({ ...m, projectOrder: index }))
				})
			)
			setProjects(items)
			/* updateOrder({
				workspaceId:string
				userId:string
				projects:items
			}) */
		}
	}

	return (
		<>
			<CreateProjectModal />
			<SidebarGroup
				title="Your projects"
				action={
					<Tooltip content={<span className="text-sm">Create project</span>}>
						<Button
							variant="light"
							size="sm"
							className="!size-6 !min-w-0 text-inherit"
							as="div"
							onClick={open}
							isIconOnly
						>
							<IconPlus className="size-4" />
						</Button>
					</Tooltip>
				}
			>
				{projects.length ? (
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="projects" type="list" direction="vertical">
							{(provided) => (
								<ul
									{...provided.droppableProps}
									className="flex flex-col gap-1 w-full"
									ref={provided.innerRef}
								>
									{projects.map((project, i) => (
										<SidebarProjectsItem
											key={project.id}
											index={i}
											data={project}
										/>
									))}
								</ul>
							)}
						</Droppable>
					</DragDropContext>
				) : isCollapsed ? (
					<Tooltip
						content={<span className="text-sm">Add project</span>}
						placement="right"
					>
						<button
							onClick={open}
							className="aspect-square text-tw-text-200 hover:bg-tw-bg-90 active:bg-tw-bg-90 h-auto w-min rounded px-2 py-1"
						>
							<IconPlus className="size-4" />
						</button>
					</Tooltip>
				) : (
					<button
						onClick={open}
						className="w-full flex justify-start text-tw-text-200 hover:bg-tw-bg-90 active:bg-tw-bg-90 rounded px-2 py-1"
					>
						<p className={'text-xs leading-5 font-medium py-px'}>Add project</p>
					</button>
				)}
			</SidebarGroup>
		</>
	)
}
