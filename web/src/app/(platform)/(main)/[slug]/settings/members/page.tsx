'use client'
import { MembersTable, useCurrentWorkspaceMember } from '@/features/members'
import { MemberType } from '@/types'
import { useParams } from 'next/navigation'

const WorkspaceMembersPage = () => {
	const { slug } = useParams()
	const { role } = useCurrentWorkspaceMember()

	return (
		<MembersTable
			currentMemberRole={role}
			type={MemberType.WORKSPACE}
			identifier={slug as string}
		/>
	)
}

export default WorkspaceMembersPage
