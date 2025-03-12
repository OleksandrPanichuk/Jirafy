'use client'

import { useDeleteInviteMutation } from '@/features/invites'
import { useConfirm } from '@/hooks'
import { Tooltip } from "@heroui/react"
import { IconTrash } from '@tabler/icons-react'

interface IWorkspaceInviteActionsProps {
	inviteId: string
}

export const WorkspaceInviteActions = ({
	inviteId
}: IWorkspaceInviteActionsProps) => {
	const { mutate: deleteInvite, isPending } = useDeleteInviteMutation()
	const [ConfirmationModal, confirm] = useConfirm()

	const handleDeleteInvite = async () => {
		const ok = await confirm()

		if (!ok) {
			return
		}

		deleteInvite({ inviteId })
	}

	return (
		<>
			<ConfirmationModal />
			<div>
				<Tooltip content={<span className="text-sm">Delete invite</span>}>
					<button
						disabled={isPending}
						className="text-lg text-danger cursor-pointer active:opacity-50"
						onClick={handleDeleteInvite}
					>
						<IconTrash className="size-5" />
					</button>
				</Tooltip>
			</div>
		</>
	)
}
