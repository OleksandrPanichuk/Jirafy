'use client'

import { Routes } from '@/constants'
import { useAuth } from '@/features/auth'
import { useCurrentWorkspace } from '@/features/workspaces'
import { cn } from '@/lib'
import { Button, Tooltip } from '@nextui-org/react'
import {
	IconArrowRight,
	IconBriefcase,
	IconChartBar,
	IconDots,
	IconHeart,
	IconHome,
	IconInbox,
	IconPlus,
	IconStack2,
	IconUserBolt
} from '@tabler/icons-react'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import {
	SidebarGroup,
	SidebarItem,
	UserMenu,
	WorkspaceSwitcher
} from './components'
import { useWorkspaceSidebarStore } from './store'

export const WorkspaceSidebar = () => {
	const [storageIsOpen, setIsOpen] = useLocalStorage('workspace-sidebar', false)
	const { isCollapsed, setIsCollapsed } = useWorkspaceSidebarStore()

	const workspace = useCurrentWorkspace()
	const user = useAuth((s) => s.user)

	useEffect(() => {
		if (storageIsOpen !== undefined) {
			setIsCollapsed(!storageIsOpen)
		}
	}, [storageIsOpen, setIsCollapsed])

	const toggle = () => setIsOpen(isCollapsed)

	return (
		<aside
			className={cn(
				'border-tw-border-200 border-r bg-tw-bg-100 pt-4',
				!isCollapsed && 'min-w-[240px]'
			)}
		>
			<div className="flex flex-col h-full">
				<div className="px-4 flex gap-2">
					<WorkspaceSwitcher />
					<UserMenu />
				</div>
				<div className="overflow-x-hidden  h-full w-full overflow-y-auto py-0.5 px-4 flex-1">
					<div className="flex flex-col gap-0.5 mt-2.5">
						<SidebarItem
							href={Routes.WORKSPACE_BY_SLUG(workspace.slug)}
							text="Home"
							icon={<IconHome className="size-4" />}
						/>
						<SidebarItem
							href={Routes.YOUR_WORK(workspace.slug, user!.id)}
							text="Your work"
							icon={<IconUserBolt className="size-4" />}
						/>
						<SidebarItem
							href={Routes.NOTIFICATIONS(workspace.slug)}
							text="Inbox"
							icon={<IconInbox className="size-4" />}
						/>
					</div>
					<SidebarGroup
						title="Workspace"
						className={cn(!isCollapsed && 'mt-2.5')}
						action={
							<Button
								variant="light"
								size="sm"
								className="!size-6 !min-w-0 text-inherit"
								as="div"
								isIconOnly
							>
								<IconDots className="size-4" />
							</Button>
						}
					>
						<SidebarItem
							href={Routes.WORKSPACE_PROJECTS(workspace.slug)}
							text="Projects"
							icon={<IconBriefcase className="size-4" />}
						/>
						<SidebarItem
							href={Routes.WORKSPACE_VIEWS_ALL(workspace.slug)}
							text="Views"
							icon={<IconStack2 className="size-4" />}
						/>
						<SidebarItem
							href={Routes.WORKSPACE_ANALYTICS(workspace.slug)}
							text="Analytics"
							icon={<IconChartBar className="size-4" />}
						/>
					</SidebarGroup>
					<SidebarGroup
						title="Your projects"
						action={
							<Tooltip
								content={<span className="text-sm">Create project</span>}
							>
								<Button
									variant="light"
									size="sm"
									className="!size-6 !min-w-0 text-inherit"
									as="div"
									isIconOnly
								>
									<IconPlus className="size-4" />
								</Button>
							</Tooltip>
						}
					></SidebarGroup>
				</div>
				<div
					className={cn(
						'border-t border-tw-border-200 px-2 flex items-center gap-1 justify-between',
						!isCollapsed ? 'h-12' : 'flex-col gap-2 py-2'
					)}
				>
					<Tooltip
						hidden={!isCollapsed}
						placement="right"
						content={<span className="text-sm">Update plan</span>}
					>
						<Button
							variant="flat"
							className={cn(
								'text-tw-primary-100 text-sm ',
								!isCollapsed && 'min-w-24 rounded-2xl'
							)}
							size="sm"
							color="primary"
							isIconOnly={isCollapsed}
						>
							<IconHeart />
							{!isCollapsed && 'Upgrade plan'}
						</Button>
					</Tooltip>

					<Tooltip
						placement="right"
						content={
							<span className="text-sm">
								{!isCollapsed ? 'Hide' : 'Expand'}
							</span>
						}
					>
						<Button variant="light" size="sm" onClick={toggle} isIconOnly>
							<IconArrowRight
								className={cn(
									'transition duration-300',
									!isCollapsed ? 'rotate-180' : 'rotate-0'
								)}
							/>
						</Button>
					</Tooltip>
				</div>
			</div>
		</aside>
	)
}
