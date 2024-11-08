'use client'

import {
	useCreateProjectModalStore,
	useProjectsStore
} from '@/features/projects'
import {} from '@/features/workspaces'
import { Button, Tooltip } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useWorkspaceSidebarStore } from '../store'
import { SidebarGroup } from './SidebarGroup'

export const SidebarProjects = () => {
	const projects = useProjectsStore((s) => s.projects)
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)

	const open = useCreateProjectModalStore((s) => s.open)

	return (
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
				<></>
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
	)
}
