import { currentUser, getAllUserInvites } from '@/api'
import { Routes } from '@/constants'
import { UserInvitesProvider } from '@/features/invites'
import { InviteState } from '@/types'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
	const user = await currentUser()
	if (!user) {
		return redirect(Routes.SIGN_IN)
	}

	if (!user.verified) {
		return redirect(Routes.VERIFY_EMAIL)
	}

	const invites = await getAllUserInvites({ state: InviteState.PENDING })

	return (
		<UserInvitesProvider initialInvites={invites}>
			{children}
		</UserInvitesProvider>
	)
}
