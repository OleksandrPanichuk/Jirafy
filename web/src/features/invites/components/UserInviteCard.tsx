'use client'

import { memberRolesMap } from '@/constants'
import { WorkspaceLogo } from '@/features/workspaces'
import { cn } from '@/lib'
import { MemberRole, TypeInviteWithWorkspace } from '@/types'
import { IconCircleCheck } from '@tabler/icons-react'

interface IUserInviteCardProps {
	data: TypeInviteWithWorkspace

	isSelected: boolean
	onToggle: () => void

	isDisabled?: boolean
}

export const UserInviteCard = ({
	data,
	isSelected,
	isDisabled,
	onToggle
}: IUserInviteCardProps) => {
	return (
		<div
			className={cn(
				'border p-3.5 flex  items-center cursor-pointer rounded gap-2',
				isSelected
					? 'border-tw-primary-100'
					: 'border-tw-border-200 hover:bg-tw-bg-80',
				isDisabled && 'opacity-50 pointer-events-none cursor-default'
			)}
			onClick={onToggle}
		>
			<WorkspaceLogo
				size={32}
				name={data.workspace.name}
				src={data.workspace.logo?.url}
			/>
			<div className="flex-1">
				<p className="text-sm font-medium">{data.workspace.name}</p>
				<p className="text-xs text-tw-text-200">
					{memberRolesMap.get(data.role as unknown as MemberRole)}
				</p>
			</div>
			<div>
				<IconCircleCheck
					className={cn('size-5', isSelected && 'text-tw-primary-100')}
				/>
			</div>
		</div>
	)
}
