import { memberRolesMap, Routes } from '@/constants'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { formatDate } from '@/lib'
import { InviteState, MemberRole, TypeInviteWithUser } from '@/types'
import { Avatar, Chip } from '@nextui-org/react'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { WorkspaceInviteActions } from '../WorkspaceInviteActions'

const chipColorToStateMap = {
	[InviteState.PENDING]: 'warning',
	[InviteState.ACCEPTED]: 'success',
	[InviteState.REJECTED]: 'danger'
} as const

export const columns: ColumnDef<TypeInviteWithUser>[] = [
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
		accessorKey: 'state',
		header: 'Status',
		cell: ({ row }) => {
			const state = row.original.state
			return (
				<Chip
					color={chipColorToStateMap[state]}
					variant="flat"
					className="badge"
					size='sm'
					radius='sm'
				>
					{state}
				</Chip>
			)
		}
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => {
			const role = memberRolesMap.get(
				row.original.role as unknown as MemberRole
			)
			return <p className='text-sm'>{role}</p>
		}
	},
	{
		accessorKey: 'createdAt',
		header: 'Invite Date',
		cell: ({ row }) => (
			<p className="text-tw-text-350 text-sm">{formatDate(row.original.createdAt)}</p>
		)
	},
	{
		id: 'actions',
		cell: () => <WorkspaceInviteActions  />
	}
]
