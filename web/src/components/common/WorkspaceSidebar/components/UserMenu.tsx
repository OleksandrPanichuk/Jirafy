'use client'

import { Routes } from '@/constants'
import { useAuth, useSignOutMutation } from '@/features/auth'
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useWorkspaceSidebarStore } from '../store'

export const UserMenu = () => {
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)
	const user = useAuth((s) => s.user)

	const router = useRouter()

	const { mutate: signOut, isPending: isSigningOut } = useSignOutMutation()

	if (!user || isCollapsed) {
		return null
	}

	return (
		<Dropdown
			placement="right"
			classNames={{
				content: 'rounded-md border border-tw-border-400 bg-tw-bg-100'
			}}
			isDisabled={isSigningOut}
		>
			<DropdownTrigger>
				<Button
					className="rounded-md !p-1 !size-8 min-w-8"
					variant="light"
					isIconOnly
				>
					<Avatar
						src={user.avatar?.url}
						size="sm"
						radius="sm"
						className="size-6"
					/>
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownItem key={'email'} className="cursor-default" isReadOnly>
					<p className="text-xs text-tw-text-400">{user.email}</p>
				</DropdownItem>
				<DropdownItem
					variant="faded"
					className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
					onPress={() => {
						router.push(Routes.PROFILE_SETTINGS)
					}}
					key="user-settings"
					href={Routes.PROFILE_SETTINGS}
					startContent={<IconSettings className="size-4 text-tw-text-200" />}
					showDivider
				>
					Settings
				</DropdownItem>
				<DropdownItem
					color="danger"
					variant="faded"
					className="text-danger rounded-md hover:!bg-tw-bg-80"
					startContent={<IconLogout className="size-4" />}
					onPress={() => signOut({})}
				>
					Sign out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}