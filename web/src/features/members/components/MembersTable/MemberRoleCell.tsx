'use client'

import { memberRolesMap } from '@/constants'
import { MemberRoleSelect, useCurrentWorkspaceMember } from '@/features/members'
import { checkMemberPermissions } from '@/lib'
import { TypeMember } from '@/types'

export const MemberRoleCell = (member: TypeMember) => {
	const { role: currentMemberRole } = useCurrentWorkspaceMember()

	if (checkMemberPermissions(currentMemberRole)) {
		// TODO: implement logic to change role and styles
		return <MemberRoleSelect value={member.role} onChange={() => {}}  />
	}

	return <p className="text-tw-text-350">{memberRolesMap.get(member.role)}</p>
}
