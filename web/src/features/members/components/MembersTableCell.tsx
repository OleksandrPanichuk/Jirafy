import { Routes } from '@/constants'
import { MemberActions, MembersTableHeaderKeys } from '@/features/members'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { formatJoinDate } from '@/lib'
import { TypeMemberWithUser } from '@/types'
import { Avatar, TableCell } from '@nextui-org/react'
import Link from 'next/link'

interface IMembersTableCellProps {
	key: MembersTableHeaderKeys
	member: TypeMemberWithUser
}

export const MembersTableCell = ({ key, member }: IMembersTableCellProps) => {
	const slug = useCurrentWorkspaceSlug()
	switch (key) {
		case 'email': {
			return <p>{member.user.email}</p>
		}
		case 'full-name': {
			return (
				<TableCell>
					<Link href={Routes.WORKSPACE_MEMBER(slug, member.userId)}>
						<Avatar
							src={member.user.avatar?.url}
							size="sm"
							radius="sm"
							className="size-8"
						/>
					</Link>
					<p>
						{member.user.firstName} {member.user.lastName}
					</p>
				</TableCell>
			)
		}
		case 'display-name': {
			return (
				<TableCell>
					<p>{member.user.username}</p>
				</TableCell>
			)
		}
		case 'role': {
			return (
				<TableCell>
					<p>{member.role}</p>
				</TableCell>
			)
		}
		case 'join-date': {
			return (
				<TableCell>
					<p>{formatJoinDate(member.createdAt)}</p>
				</TableCell>
			)
		}
		case 'actions': {
			return (
				<TableCell>
					<MemberActions memberId={member.id} />
				</TableCell>
			)
		}
		default: {
			return <></>
		}
	}
}
