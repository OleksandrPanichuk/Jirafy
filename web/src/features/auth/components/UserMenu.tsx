'use client'

import { Routes } from '@/constants'
import { useAuth, useSignOutMutation } from '@/features/auth'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	User
} from '@nextui-org/react'
import { IconEdit, IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

interface IUserMenuProps {
	onlySignOut?: boolean
}

export const UserMenu = ({ onlySignOut }: IUserMenuProps) => {
	const user = useAuth((s) => s.user)
	const router = useRouter()
	const { mutate: signOut, isPending: isSigningOut } = useSignOutMutation()

	if (!user) {
		return null
	}

	return (
		<Dropdown
			isDisabled={isSigningOut}
			classNames={{
				content: 'py-1 px-1 border border-default-200 mt-2'
			}}
		>
			<DropdownTrigger>
				<User
					as="button"
					avatarProps={{
						isBordered: true,
						src: user.avatar?.url
					}}
					className="transition-transform"
					description={`@${user.username}`}
					name={`${user.firstName} ${user.lastName}`}
				/>
			</DropdownTrigger>
			<DropdownMenu variant="faded">
				{!onlySignOut ? (
					<DropdownSection showDivider>
						<DropdownItem
							href={Routes.CHANGE_EMAIL}
							startContent={<IconEdit />}
							onPress={() => router.push(Routes.CHANGE_EMAIL)}
						>
							Change email address
						</DropdownItem>
					</DropdownSection>
				) : (
					<></>
				)}
				<DropdownItem
					color="danger"
					className="text-danger"
					startContent={<IconLogout className={'text-danger'} />}
					onPress={signOut}
				>
					Sign out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
