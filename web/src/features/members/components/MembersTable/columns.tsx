import { memberRolesMap, Routes } from '@/constants'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { formatJoinDate } from '@/lib'
import { TypeMemberWithUser } from '@/types'
import { Avatar } from '@nextui-org/react'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { MemberActions } from '../MemberActions'

export const columns: ColumnDef<TypeMemberWithUser>[] = [
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => {
			return <p className="text-tw-text-350">{row.original.user.email}</p>
		}
	},
	{
		id: 'full-name',
		header: 'Full Name',
		cell: function FullNameCell({ row }) {
			const member = row.original
			const slug = useCurrentWorkspaceSlug()
			return (
				<div className="flex items-center gap-2">
					<Link href={Routes.WORKSPACE_MEMBER(slug, member.userId)}>
						<Avatar
							src={member.user.avatar?.url}
							size="sm"
							radius="sm"
							className="size-8"
						/>
					</Link>
					<p className="text-tw-text-350">
						{member.user.firstName} {member.user.lastName}
					</p>
				</div>
			)
		}
	},
	{
		id: 'display-name',
		header: 'Display Name',
		cell: ({ row }) => (
			<p className="text-tw-text-350">{row.original.user.username}</p>
		)
	},
	// TODO: if i am OWNER then i change another user role
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => (
			<p className="text-tw-text-350">{memberRolesMap.get(row.original.role)}</p>
		)
	},
	{
		accessorKey: 'createdAt',
		header: 'Join Date',
		cell: ({ row }) => (
			<p className="text-tw-text-350">
				{formatJoinDate(row.original.createdAt)}
			</p>
		)
	},
	{
		id: 'actions',
		cell: ({ row }) => <MemberActions memberId={row.original.id} />
	}
]
