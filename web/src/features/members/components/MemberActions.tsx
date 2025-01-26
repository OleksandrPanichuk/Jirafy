'use client'

import { Button } from '@/components/ui'
import { useDeleteMemberMutation, useCurrentWorkspaceMember } from '@/features/members'
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

	const member = useCurrentWorkspaceMember()
	const { mutate: deleteMember, isPending } = useDeleteMemberMutation()

	const handleRemoveMember = async () => {
		const ok = await confirm()
		if (!ok) {
			return
		}

		deleteMember({ memberId })
	}

	if (memberId === member.id) {
		return null
	}

	return (
		<>
			<ConfirmationModal />
			<Dropdown isDisabled={isPending}>
				<DropdownTrigger>
					<Button className="!size-6 p-1 min-w-0" variant="ghost" isIconOnly>
						<IconDotsVertical className="size-4 text-default-300" />
					</Button>
				</DropdownTrigger>
				<DropdownMenu>
					<DropdownItem
						startContent={<IconTrash className="size-4 mr-2" />}
						onPress={handleRemoveMember}
						key={'key'}
					>
						Delete
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	)
}
