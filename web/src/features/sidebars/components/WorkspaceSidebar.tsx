'use client'

import { Drawer, DrawerContent } from '@/components/ui'
import { breakpoints, Routes } from '@/constants'
import { useAuth } from '@/features/auth'
import {
	SidebarFavorites,
	SidebarGroup,
	SidebarItem,
	SidebarProjects,
	UserMenu,
	useWorkspaceSidebarStore,
	WorkspaceActions,
	WorkspaceSidebarProvider,
	WorkspaceSwitcher
} from '@/features/sidebars'
import { useDisclosure } from '@/hooks'
import { cn } from '@/lib'
import { Button, Tooltip } from '@nextui-org/react'
import {
	IconArrowRight,
	IconBriefcase,
	IconChartBar,
	IconHeart,
	IconHome,
	IconInbox,
	IconMenu2,
	IconMessage,
	IconStack2,
	IconUserBolt
} from '@tabler/icons-react'
import { useMedia } from 'react-use'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'

interface IWorkspaceSidebarProps {
	alwaysOpen?: boolean
	className?: string
}

const WorkspaceSidebar = ({
	alwaysOpen,
	className
}: IWorkspaceSidebarProps) => {
	return (
		<WorkspaceSidebarProvider alwaysOpen={alwaysOpen}>
			<SidebarContent alwaysOpen={alwaysOpen} className={className} />
		</WorkspaceSidebarProvider>
	)
}

export const WorkspaceSidebarDesktop = () => {
	const isMobile = useMedia(breakpoints['max-md'], false)
	if (isMobile) return null

	return <WorkspaceSidebar className={'hidden md:block'} />
}

export const WorkspaceSidebarMobile = () => {
	const { isOpen, open, setIsOpen, close } = useDisclosure()
	const isMobile = useMedia(breakpoints['max-md'], true)

	if (!isMobile) return null

	return (
		<WorkspaceSidebarProvider>
			<Button
				className="size-8 md:hidden"
				onPress={open}
				isIconOnly
				color="default"
				variant="flat"
			>
				<IconMenu2 />
			</Button>
			<Drawer
				className="max-w-[280px]"
				isOpen={isOpen}
				onClose={close}
				onOpenChange={setIsOpen}
			>
				<DrawerContent>
					<WorkspaceSidebar alwaysOpen />
				</DrawerContent>
			</Drawer>
		</WorkspaceSidebarProvider>
	)
}

function SidebarContent({ alwaysOpen, className }: IWorkspaceSidebarProps) {
	const { isCollapsed, toggle } = useWorkspaceSidebarStore()

	const workspaceSlug = useCurrentWorkspaceSlug()
	const user = useAuth((s) => s.user)

	return (
		<aside
			className={cn(
				'border-tw-border-200 border-r bg-tw-bg-100 pt-4 h-full',
				!isCollapsed && 'min-w-[240px]',
				className
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
							href={Routes.WORKSPACE_BY_SLUG(workspaceSlug)}
							text="Home"
							icon={<IconHome className="size-4" />}
						/>
						<SidebarItem
							href={Routes.YOUR_WORK(workspaceSlug, user!.id)}
							text="Your work"
							icon={<IconUserBolt className="size-4" />}
						/>
						<SidebarItem
							href={Routes.NOTIFICATIONS(workspaceSlug)}
							text="Inbox"
							icon={<IconInbox className="size-4" />}
						/>
					</div>
					<SidebarGroup title="Workspace" action={<WorkspaceActions />}>
						<SidebarItem
							href={Routes.WORKSPACE_PROJECTS(workspaceSlug)}
							text="Projects"
							icon={<IconBriefcase className="size-4" />}
						/>
						<SidebarItem
							href={Routes.WORKSPACE_VIEWS_ALL(workspaceSlug)}
							text="Views"
							icon={<IconStack2 className="size-4" />}
						/>
						<SidebarItem
							href={Routes.WORKSPACE_CHAT(workspaceSlug)}
							text="Chat"
							icon={<IconMessage className="size-4" />}
						/>
						<SidebarItem
							href={Routes.WORKSPACE_ANALYTICS(workspaceSlug)}
							text="Analytics"
							icon={<IconChartBar className="size-4" />}
						/>
					</SidebarGroup>
					<SidebarFavorites />
					<SidebarProjects />
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
								!isCollapsed && 'min-w-24 rounded-2xl',
								alwaysOpen && 'w-full'
							)}
							size="sm"
							color="primary"
							isIconOnly={isCollapsed}
						>
							<IconHeart />
							{!isCollapsed && 'Upgrade plan'}
						</Button>
					</Tooltip>

					{!alwaysOpen && (
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
					)}
				</div>
			</div>
		</aside>
	)
}
