'use client'

import { useDeleteInviteMutation } from '@/features/invites'
import { Tooltip } from '@nextui-org/react'
import { IconTrash } from '@tabler/icons-react'

interface IWorkspaceInviteActionsProps {
	inviteId: string
}

export const WorkspaceInviteActions = ({
	inviteId
}: IWorkspaceInviteActionsProps) => {
	const { mutate: deleteInvite, isPending } = useDeleteInviteMutation()
	const handleDeleteInvite = () => deleteInvite({ inviteId })

	return (
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
	)
}
