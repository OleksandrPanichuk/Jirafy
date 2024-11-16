'use client'

import { Routes } from '@/constants'
import { useAuth, useSignOutMutation } from '@/features/auth'
import { useWorkspaceSidebarStore } from '@/features/sidebars'
import { useWorkspacesStore } from '@/features/workspaces'
import { useDisclosure } from '@/hooks'
import { cn } from '@/lib'
import { MemberRole, TypeWorkspace } from '@/types'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger
} from '@nextui-org/react'
import {
	IconCheck,
	IconChevronDown,
	IconLogout,
	IconMail,
	IconSettings,
	IconSquarePlus
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import randomColor from 'randomcolor'

// TODO: when adding a subscription check whether user can create new workspace or not
export const WorkspaceSwitcher = () => {
	const { isOpen, toggle, close } = useDisclosure()

	const router = useRouter()

	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)
	const user = useAuth((s) => s.user)

	const { mutate: signOut, isPending: isSigningOut } = useSignOutMutation()

	const workspaces = useWorkspacesStore((s) => s.workspaces)
	const selectWorkspace = useWorkspacesStore((s) => s.selectWorkspace)
	const getCurrentWorkspace = useWorkspacesStore((s) => s.getCurrentWorkspace)

	const currentWorkspace = getCurrentWorkspace() ?? workspaces[0]

	const isCurrentWorkspace = (workspace: TypeWorkspace) => {
		return workspace.id === currentWorkspace.id
	}

	const handleSelectWorkspace = (workspace: TypeWorkspace) => {
		selectWorkspace(workspace.slug)
		close()

		router.push(Routes.WORKSPACE_BY_SLUG(workspace.slug))
	}

	const handleSignOut = () =>
		signOut(undefined, {
			onSuccess: () => {
				close()
			}
		})

	if (!user || !workspaces.length) {
		return null
	}

	const currentMember = currentWorkspace.members[0]

	const hasAccess =
		currentMember.role === MemberRole.ADMIN ||
		currentMember.role === MemberRole.OWNER

	return (
		<Dropdown
			onOpenChange={toggle}
			isOpen={isOpen}
			isDisabled={isSigningOut}
			classNames={{
				content:
					'rounded-md border border-tw-border-400 bg-tw-bg-100 min-w-[280px]'
			}}
		>
			<DropdownTrigger>
				<Button
					className={cn(
						'rounded-md group-trigger w-full justify-start min-w-8 h-8 p-1',
						isCollapsed && 'justify-center'
					)}
					variant="light"
					isIconOnly={isCollapsed}
				>
					<div
						className={cn(
							'size-6 rounded-md flex items-center justify-center  font-bold'
						)}
						style={{
							backgroundColor: randomColor({
								seed: currentWorkspace.name.at(0),
								luminosity: 'dark'
							}),
							color: randomColor({
								luminosity: 'light',
								seed: currentWorkspace.name.at(0)
							})
						}}
					>
						{currentWorkspace.name[0].toUpperCase()}
					</div>
					{!isCollapsed && (
						<>
							<p className="flex-1 text-start">{currentWorkspace.name}</p>
							<IconChevronDown
								className={cn(
									'group-hover/trigger:inline-block hidden transition-transform',
									isOpen && 'rotate-180'
								)}
							/>
						</>
					)}
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownItem key={'email'} className="cursor-default" isReadOnly>
					<p className="text-xs text-tw-text-400">{user.email}</p>
				</DropdownItem>
				<DropdownSection aria-label="Workspace select" showDivider>
					{workspaces.map((workspace) => (
						<DropdownItem
							className={' hover:!bg-tw-bg-80 rounded-md p-1'}
							variant="flat"
							key={`select-workspace-${workspace.slug}`}
							onPress={() => handleSelectWorkspace(workspace)}
						>
							<div className="flex items-center gap-2">
								<div
									className={cn(
										'size-6 rounded-md flex items-center justify-center  font-bold'
									)}
									style={{
										backgroundColor: randomColor({
											seed: workspace.name.at(0),
											luminosity: 'dark'
										}),
										color: randomColor({
											luminosity: 'light',
											seed: workspace.name.at(0)
										})
									}}
								>
									{workspace.name[0].toUpperCase()}
								</div>
								<p
									className={cn(
										'flex-1 text-start',
										!isCurrentWorkspace(workspace) && 'text-tw-text-200'
									)}
								>
									{workspace.name}
								</p>
								{workspace.members[0].isWorkspaceSelected && (
									<IconCheck className="size-4 text-white" />
								)}
							</div>
						</DropdownItem>
					))}
				</DropdownSection>
				<DropdownSection
					classNames={{
						group: 'flex flex-col gap-1'
					}}
					showDivider
				>
					<DropdownItem
						variant="faded"
						className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
						onPress={() => {
							close()
							router.push(Routes.CREATE_WORKSPACE)
						}}
						key="create-workspace"
						href={Routes.CREATE_WORKSPACE}
						startContent={
							<IconSquarePlus className="size-4 text-tw-text-200" />
						}
					>
						Create workspace
					</DropdownItem>
					<DropdownItem
						variant="faded"
						className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
						onPress={() => {
							close()
							router.push(Routes.INVITATIONS)
						}}
						key="workspace-invites"
						href={Routes.INVITATIONS}
						startContent={<IconMail className="size-4 text-tw-text-200" />}
					>
						Workspace invites
					</DropdownItem>
					<>
						{hasAccess && (
							<DropdownItem
								variant="faded"
								className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
								onPress={() => {
									close()
									router.push(Routes.WORKSPACE_SETTINGS(currentWorkspace.slug))
								}}
								key="workspace-settings"
								href={Routes.WORKSPACE_SETTINGS(currentWorkspace.slug)}
								startContent={
									<IconSettings className="size-4 text-tw-text-200" />
								}
							>
								Workspace settings
							</DropdownItem>
						)}
					</>
				</DropdownSection>
				<DropdownItem
					color="danger"
					variant="faded"
					className="text-danger rounded-md hover:!bg-tw-bg-80"
					startContent={<IconLogout className="size-4" />}
					onPress={handleSignOut}
				>
					Sign out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
