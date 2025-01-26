'use client'
import { MembersTable } from '@/features/members'
import { MemberType } from '@/types'
import { useParams } from 'next/navigation'
import { useCurrentWorkspaceMember } from '@/features/members'

const WorkspaceMembersPage = () => {
	const { slug } = useParams()
	const {role} = useCurrentWorkspaceMember()

	return (
		<div>
			<MembersTable currentMemberRole={role} type={MemberType.WORKSPACE} identifier={slug as string} />
		</div>
	)
}

export default WorkspaceMembersPage
