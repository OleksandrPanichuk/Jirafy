'use client'

import {
	useChannelsGroupModalStore,
	useChannelsModalStore,
	useChannelsStore
} from '@/features/chat'
import { Button } from '@/features/shared'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@heroui/react'
import { IconFolder, IconPlus } from '@tabler/icons-react'

export const CreateChannelButton = () => {
	const openChannelsGroupModal = useChannelsGroupModalStore((s) => s.open)
	const openChannelModal = useChannelsModalStore((s) => s.open)

	const [group] = useChannelsStore((s) => s.channelsGroups)

	return (
		<>
			<Dropdown placement="right">
				<DropdownTrigger>
					<Button as="div" variant={'light'} size="sm" isIconOnly>
						<IconPlus className="size-4" />
					</Button>
				</DropdownTrigger>
				<DropdownMenu>
					{/* TODO: create channel */}
					<DropdownItem
						variant="flat"
						startContent={<IconPlus className="size-4" />}
						key="create-channel"
						onPress={() => openChannelModal('create', { groupId: group?.id })}
					>
						Create channel
					</DropdownItem>

					<DropdownItem
						variant="flat"
						startContent={<IconFolder className="size-4" />}
						key="create-group"
						onPress={() => openChannelsGroupModal()}
					>
						Create channels group
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	)
}
