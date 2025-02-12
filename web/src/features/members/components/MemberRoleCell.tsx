'use client'

import { memberRolesMap } from '@/constants'
import { useAuth } from '@/features/auth'
import {
	MemberRoleSelect,
	useCurrentWorkspaceMember,
	useUpdateMemberRoleMutation
} from '@/features/members'
import { checkMemberPermissions } from '@/lib'
import { InviteMemberRole, MemberRole, TypeMember } from '@/types'

export const MemberRoleCell = (member: TypeMember) => {
	const currentMember = useCurrentWorkspaceMember()
	const currentUser = useAuth((s) => s.user)

	const { mutate: updateRole, isPending } = useUpdateMemberRoleMutation()

	const handleRoleChange = (value: MemberRole) => {
		if (value === MemberRole.OWNER) {
			return
		}
		updateRole({
			memberId: member.id,
			role: value as never as InviteMemberRole
		})
	}

	if (
		member.userId !== currentUser?.id &&
		(currentMember?.role === MemberRole.OWNER ||
			!checkMemberPermissions(member.role))
	) {
		return (
			<MemberRoleSelect
				value={member.role}
				onChange={handleRoleChange}
				isDisabled={isPending}
				classNames={{
					trigger: 'min-w-16 flex justify-start'
				}}
				headlessTrigger
				withArrow
			/>
		)
	}

	return (
		<p className="text-tw-text-350 min-w-20 text-start">
			{memberRolesMap.get(member.role)}
		</p>
	)
}
