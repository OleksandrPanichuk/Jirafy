'use client'

import { breakpoints, Routes } from '@/constants'
import { useAuth, useSignOutMutation } from '@/features/auth'
import { useWorkspaceSidebarStore } from '@/features/sidebars'
import { useMediaQuery } from '@/hooks'
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import { useRouter } from 'next-nprogress-bar'

export const UserMenu = () => {
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)
	const [isMobile] = useMediaQuery(breakpoints['max-sm'])
	const user = useAuth((s) => s.user)

	const router = useRouter()

	const { mutate: signOut, isPending: isSigningOut } = useSignOutMutation()

	if (!user || isCollapsed) {
		return null
	}

	return (
		<Dropdown
			placement={isMobile ? 'bottom-end' : 'right'}
			classNames={{
				content: 'rounded-md border border-tw-border-400 bg-tw-bg-100'
			}}
			isDisabled={isSigningOut}
		>
			<DropdownTrigger>
				<Button
					className="rounded-md !p-0 !size-8 min-w-8"
					variant="light"
					isIconOnly
				>
					<Avatar
						src={user.avatar?.url}
						size="sm"
						radius="sm"
						className="size-8"
					/>
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownItem key={'email'} className="cursor-default" isReadOnly>
					<p className="text-xs text-tw-text-400">{user.email}</p>
				</DropdownItem>
				<DropdownItem
					variant="flat"
					className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
					onPress={() => {
						router.push(Routes.PROFILE)
					}}
					key="user-settings"
					href={Routes.PROFILE}
					startContent={<IconSettings className="size-4 text-tw-text-200" />}
					showDivider
				>
					Settings
				</DropdownItem>
				<DropdownItem
					color="danger"
					variant="flat"
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
