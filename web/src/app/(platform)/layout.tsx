import { currentUser, getAllUserInvites, getAllWorkspaces } from '@/api'
import { Routes } from '@/constants'
import { UserInvitesProvider } from '@/features/invites'
import { InviteState } from '@/types'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { WorkspacesProvider } from '@/features/workspaces'

export default async function Layout({ children }: PropsWithChildren) {
	const user = await currentUser()
	if (!user) {
		return redirect(Routes.SIGN_IN)
	}

	if (!user.verified) {
		return redirect(Routes.VERIFY_EMAIL)
	}

	const invites = await getAllUserInvites({ state: InviteState.PENDING })
	const workspaces = await getAllWorkspaces()

	return (
		<UserInvitesProvider initialInvites={invites}>
			<WorkspacesProvider initialWorkspaces={workspaces}>
				{children}
			</WorkspacesProvider>
		</UserInvitesProvider>
	)
}
