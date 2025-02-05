'use client'

import {
	NoUserInvites,
	UserInvites,
	useUserInvitesStore
} from '@/features/invites'

const InvitationsPage = () => {
	const invitesCount = useUserInvitesStore((s) => s.invites.length)
	return <>{invitesCount > 0 ? <UserInvites /> : <NoUserInvites />}</>
}

export default InvitationsPage
