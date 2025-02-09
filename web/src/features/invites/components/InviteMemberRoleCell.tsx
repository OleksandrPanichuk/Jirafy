'use client'

import { useUpdateInviteMutation } from '@/features/invites'
import { MemberRoleSelect } from '@/features/members'
import { InviteMemberRole, MemberRole, TypeInvite } from '@/types'

export const InviteMemberRoleCell = (invite: TypeInvite) => {
	const { mutate: updateInvite } = useUpdateInviteMutation()

	const handleRoleChange = (value: MemberRole) => {
		updateInvite({
			inviteId: invite.id,
			role: value as unknown as InviteMemberRole
		})
	}

	return (
		<MemberRoleSelect
			value={invite.role as unknown as MemberRole}
			onChange={handleRoleChange}
			classNames={{
				trigger: 'min-w-16 flex justify-start'
			}}
			headlessTrigger
		/>
	)
}
