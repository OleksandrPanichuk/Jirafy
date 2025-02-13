'use client'

import { Drawer, DrawerContent } from '@/components/ui'
import { breakpoints, Routes } from '@/constants'
import { useAuth, useSignOutMutation } from '@/features/auth'
import {
	profileSidebarLinks,
	ProfileSidebarProvider,
	SidebarItem,
	SidebarNavButton,
	useProfileSidebarStore
} from '@/features/sidebars'
import { useWorkspacesStore, WorkspaceLogo } from '@/features/workspaces'
import { useDisclosure, useMediaQuery } from '@/hooks'
import { cn } from '@/lib'
import { Button, Tooltip } from '@nextui-org/react'
import {
	IconArrowRight,
	IconChevronLeft,
	IconLogout,
	IconMail,
	IconMenu2,
	IconPlus
} from '@tabler/icons-react'
import Link from 'next/link'

interface IProfileSidebarProps {
	alwaysOpen?: boolean
	className?: string
}

const ProfileSidebar = ({ alwaysOpen, className }: IProfileSidebarProps) => {
	return (
		<ProfileSidebarProvider alwaysOpen={alwaysOpen}>
			<SidebarContent alwaysOpen={alwaysOpen} className={className} />
		</ProfileSidebarProvider>
	)
}

export const ProfileSidebarDesktop = () => {
	const [isMobile] = useMediaQuery(breakpoints['max-md'], {
		fallback: false
	})
	if (isMobile) return null

	return <ProfileSidebar className={'hidden md:block'} />
}

export const ProfileSidebarMobile = () => {
	const { isOpen, open, setIsOpen, close } = useDisclosure()
	const [isMobile] = useMediaQuery(breakpoints['max-md'])

	if (!isMobile) return null
	return (
		<>
			<Button
				className="size-6 md:hidden"
				onPress={open}
				isIconOnly
				size="sm"
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
					<ProfileSidebar alwaysOpen />
				</DrawerContent>
			</Drawer>
		</>
	)
}

const SidebarContent = ({ alwaysOpen, className }: IProfileSidebarProps) => {
	const { isCollapsed, toggle } = useProfileSidebarStore()

	const user = useAuth((s) => s.user)
	const workspaces = useWorkspacesStore((s) => s.workspaces)

	const { mutate: signOut, isPending: isSigningOut } = useSignOutMutation()

	if (!user) {
		return null
	}
	return (
		<aside
			className={cn(
				'border-tw-border-200 border-r bg-tw-bg-100 pt-4 h-full ',
				!isCollapsed && 'min-w-[240px]',
				className
			)}
		>
			<div className="flex flex-col h-full">
				<Link href={Routes.ROOT}>
					<div className={cn('flex items-center gap-2 pl-5')}>
						<IconChevronLeft />

						{!isCollapsed && <h4 className="font-medium">Profile settings</h4>}
					</div>
				</Link>
				<div className="overflow-x-hidden mt-2  h-full w-full overflow-y-auto py-0.5 px-4 flex-1 no-scroll">
					<div className="flex flex-col gap-0.5 mt-2.5">
						{!isCollapsed && (
							<span className="text-tw-text-400 text-sm font-semibold">
								Your account
							</span>
						)}
						{profileSidebarLinks.map((link) => (
							<SidebarItem key={link.id} isCollapsed={isCollapsed} {...link} />
						))}
					</div>
					<div className="flex flex-col gap-0.5 mt-4">
						{!isCollapsed && (
							<span className="text-tw-text-400 text-sm font-semibold">
								Workspaces
							</span>
						)}
						{workspaces.map((workspace) => (
							<SidebarNavButton
								key={workspace.id}
								href={Routes.WORKSPACE_BY_SLUG(workspace.slug)}
								tooltipText={workspace.name}
								isCollapsed={isCollapsed}
								startContent={
									<WorkspaceLogo
										name={workspace.name}
										size={24}
										src={workspace.logo?.url}
									/>
								}
							>
								{workspace.name}
							</SidebarNavButton>
						))}
						<SidebarNavButton
							href={Routes.CREATE_WORKSPACE}
							startContent={<IconPlus className="size-4" />}
							isCollapsed={isCollapsed}
						>
							Create workspace
						</SidebarNavButton>
						<SidebarNavButton
							href={Routes.INVITATIONS}
							startContent={<IconMail className="size-4" />}
							isCollapsed={isCollapsed}
						>
							Invitations
						</SidebarNavButton>
					</div>
				</div>
				<div
					className={cn(
						'border-t border-tw-border-200 px-2 flex items-center gap-1 justify-between',
						!isCollapsed ? 'h-12' : 'flex-col gap-2 py-2'
					)}
				>
					<button
						className={cn(
							'text-danger text-sm flex gap-2 items-center',
							!isCollapsed && 'min-w-24 pl-4',
							alwaysOpen && 'w-full'
						)}
						onClick={signOut}
						disabled={isSigningOut}
					>
						<IconLogout className="size-5" />
						{!isCollapsed && 'Sign out'}
					</button>

					{!alwaysOpen && (
						<Tooltip
							placement="right"
							content={
								<span className="text-sm">
									{!isCollapsed ? 'Hide' : 'Expand'}
								</span>
							}
						>
							<Button
								isDisabled={isSigningOut}
								variant="light"
								size="sm"
								onClick={toggle}
								isIconOnly
							>
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
