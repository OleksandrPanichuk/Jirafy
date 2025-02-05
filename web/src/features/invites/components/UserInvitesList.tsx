'use client'

import { UserInviteCard, useUserInvitesStore } from '@/features/invites'
import { useState } from 'react'

export const UserInvitesList = () => {
	const invites = useUserInvitesStore((s) => s.invites)

	
	const [selected, setSelected] = useState<Set<string>>(new Set())

	const onSelect = (id: string) => {
		setSelected((prev) => new Set([...prev, id]))
	}
	const onDeselect = (id: string) => {
		setSelected((prev) => {
			const newSelected = new Set(prev)
			newSelected.delete(id)
			return newSelected
		})
	}

	return (
		<>
			<ul>
				{invites.map((invite) => (
					<UserInviteCard
						key={invite.id}
						data={invite}
						onSelect={() => onSelect(invite.id)}
						onDeselect={() => onDeselect(invite.id)}
						isSelected={selected.has(invite.id)}
					/>
				))}
			</ul>
		</>
	)
}
