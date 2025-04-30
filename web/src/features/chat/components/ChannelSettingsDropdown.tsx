'use client'

import { DEFAULT_CHANNEL_NAME, Routes } from '@/constants'
import {
	ModalVariants,
	useChannelsModalStore,
	useDeleteChannelMutation
} from '@/features/chat'
import { useCurrentWorkspaceMember } from '@/features/members'
import { Button } from '@/features/shared'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { useConfirm } from '@/hooks'
import { checkMemberPermissions } from '@/lib'
import { TypeChannel } from '@/types'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@heroui/react'
import { IconDotsVertical } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

interface IChannelSettingsDropdownProps {
	channel: TypeChannel
}

export const ChannelSettingsDropdown = ({
	channel
}: IChannelSettingsDropdownProps) => {
	const currentMember = useCurrentWorkspaceMember()
	const openChannelModal = useChannelsModalStore((s) => s.open)
	const slug = useCurrentWorkspaceSlug()
	const [ConfirmationModal, confirm] = useConfirm()
	const router = useRouter()

	const { mutate: deleteChannel } = useDeleteChannelMutation()

	const handleChannelDelete = async () => {
		const ok = await confirm()

		if (!ok) {
			return
		}

		deleteChannel(channel.id, {
			onSuccess: () => {
				router.push(Routes.WORKSPACE_CHANNELS(slug))
			}
		})
	}

	if (!checkMemberPermissions(currentMember.role)) {
		return null
	}

	if (channel.name === DEFAULT_CHANNEL_NAME) {
		return null
	}

	return (
		<>
			<ConfirmationModal />
			<Dropdown>
				<DropdownTrigger>
					<Button variant={'light'} color="default" size="sm" isIconOnly>
						<IconDotsVertical className="size-3.5" />
					</Button>
				</DropdownTrigger>
				<DropdownMenu>
					<DropdownItem
						onPress={() => openChannelModal(ModalVariants.UPDATE, channel)}
						key="edit"
					>
						Edit
					</DropdownItem>
					<DropdownItem onPress={handleChannelDelete} key="delete">
						Delete
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	)
}
