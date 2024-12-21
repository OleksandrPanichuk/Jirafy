'use client'

import { Button } from '@/components/ui'
import { useConfirm } from '@/hooks'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'

interface IMemberActionsProps {
	memberId: string
}

export const MemberActions = ({ memberId }: IMemberActionsProps) => {
	const [ConfirmationModal, confirm] = useConfirm()

	const handleRemoveMember = async () => {
		const ok = await confirm()
		if (!ok) {
			return
		}
	}
	return (
		<>
			<ConfirmationModal />
			<Dropdown>
				<DropdownTrigger>
					<Button isIconOnly size="sm" variant="ghost">
						<IconDotsVertical className="text-default-300" />
					</Button>
				</DropdownTrigger>
				<DropdownMenu>
					<DropdownItem onPress={handleRemoveMember}>
						<IconTrash className="size-4 mr-2" />
						Delete
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	)
}
