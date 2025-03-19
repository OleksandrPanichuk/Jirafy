'use client'

import { ReorderProjectsInput } from '@/api'
import {
	useCreateProjectModalStore,
	useProjectsStore,
	useReorderProjectsMutation
} from '@/features/projects'
import { DragHandle, SortableItem, SortableList } from '@/features/shared'
import {
	SidebarGroup,
	SidebarProjectsItem,
	useWorkspaceSidebarStore
} from '@/features/sidebars'
import { useCurrentWorkspace } from '@/features/workspaces'
import { TypeProjectWithCurrentMember } from '@/types'
import { Button, Tooltip } from '@heroui/react'
import { IconPlus } from '@tabler/icons-react'

export const SidebarProjects = () => {
	const projects = useProjectsStore((s) => s.projects)
	const setProjects = useProjectsStore((s) => s.setProjects)
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)
	const currentWorkspace = useCurrentWorkspace()

	const open = useCreateProjectModalStore((s) => s.open)

	const { mutate: executeReorder } = useReorderProjectsMutation()

	const onDragEnd = (items: TypeProjectWithCurrentMember[]) => {
		const projects = items.map((item, index) => ({
			...item,
			members: item.members.map((m) => ({ ...m, projectOrder: index + 1 }))
		}))
		setProjects(projects)

		const data = projects.map((item) => ({
			projectId: item.id,
			order: item.members[0].projectOrder
		})) satisfies ReorderProjectsInput['data']

		executeReorder({
			workspaceId: currentWorkspace.id,
			data
		})
	}

	return (
		<>
			<SidebarGroup
				title="Your projects"
				classNames={{
					trigger: 'mb-1'
				}}
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
					<SortableList
						items={projects}
						className="w-full flex flex-col gap-0.5"
						onChange={onDragEnd}
						renderItem={(item) => (
							<SortableItem className="relative" id={item.id}>
								{!isCollapsed && (
									<DragHandle className="absolute top-[13.5px] left-[-12px] translate-y-[-50%]" />
								)}
								<SidebarProjectsItem data={item} />
							</SortableItem>
						)}
						renderPreview={(item) => (
							<SidebarProjectsItem.DndPreview data={item} />
						)}
					/>
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
