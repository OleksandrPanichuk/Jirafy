'use client'

import { UserInvitesList } from '@/features/invites'

export const UserInvites = () => {
	return (
		<div className={'sm:w-[95%] w-full space-y-10'}>
			<p className={'text-lg'}>
				We see that someone has invited you to join a workspace
			</p>
			<h3 className={'text-2xl font-semibold'}>Join a workspace</h3>
			<UserInvitesList />
		</div>
	)
}
