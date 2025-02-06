'use client'

import { Button } from '@/components/ui'
import {
	useCurrentWorkspaceMember,
	useDeleteMemberMutation
} from '@/features/members'
import { useConfirm } from '@/hooks'
import { checkMemberPermissions } from '@/lib'
import { MemberRole } from '@/types'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'

interface IMemberActionsProps {
	memberId: string
	role: MemberRole
}

export const MemberActions = ({ memberId, role }: IMemberActionsProps) => {
	const [ConfirmationModal, confirm] = useConfirm()

	const currentMember = useCurrentWorkspaceMember()
	const { mutate: deleteMember, isPending } = useDeleteMemberMutation()

	const handleRemoveMember = async () => {
		const ok = await confirm()
		if (!ok) {
			return
		}

		deleteMember({ memberId })
	}

	if (
		memberId === currentMember.id ||
		role === MemberRole.OWNER ||
		!checkMemberPermissions(currentMember.role)
	) {
		return <div className="w-6" />
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
