'use client'

import { TypeInviteWithUser } from '@/types'

interface IUserInviteCardProps {
	data: TypeInviteWithUser

	isSelected: boolean
	onSelect: () => void
	onDeselect: () => void
}

export const UserInviteCard = ({
	data,
	isSelected,
	onDeselect,
	onSelect
}: IUserInviteCardProps) => {
	return (
		<div className="border border-tw-border-300 p-3 flex ">
			{/* Workspace logo */}
			<div>
				
			</div>

			{/* Workspace name and role */}
			<div></div>

			{/* Icon */}
			<div></div>
		</div>
	)
}
