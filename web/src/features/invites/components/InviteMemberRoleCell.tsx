'use client'

import { memberRolesMap } from '@/constants'
import { useUpdateInviteMutation } from '@/features/invites'
import { MemberRoleSelect } from '@/features/members'
import { InviteMemberRole, InviteState, MemberRole, TypeInvite } from '@/types'

export const InviteMemberRoleCell = (invite: TypeInvite) => {
	const { mutate: updateInvite } = useUpdateInviteMutation()

	const handleRoleChange = (value: MemberRole) => {
		updateInvite({
			inviteId: invite.id,
			role: value as unknown as InviteMemberRole
		})
	}


	if(invite.state !== InviteState.PENDING) {
	  return 	<p className="text-tw-text-350 min-w-20 text-start">
					{memberRolesMap.get(invite.role as unknown as MemberRole)}
				</p>	
	}

	return (
		<MemberRoleSelect
			value={invite.role as unknown as MemberRole}
			onChange={handleRoleChange}
			classNames={{
				trigger: 'min-w-16 flex justify-start'
			}}
			headlessTrigger
			withArrow
		/>
	)
}
