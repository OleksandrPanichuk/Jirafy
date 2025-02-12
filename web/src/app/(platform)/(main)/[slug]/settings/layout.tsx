'use client'
import { useCurrentWorkspaceMember } from '@/features/members'
import {
	WorkspaceSettingsHeader,
	WorkspaceSettingsNavigation
} from '@/features/workspaces'
import { checkMemberPermissions } from '@/lib'

import { PropsWithChildren } from 'react'
import { WorkspaceSettingsNavigationMobile } from '../../../../../features/workspaces/components/WorkspaceSettingsNavigation'

export default function Layout({ children }: PropsWithChildren) {
	const currentMember = useCurrentWorkspaceMember()

	const hasPermission = checkMemberPermissions(currentMember.role)

	if (!hasPermission) {
		return null
	}

	return (
		<div className={'flex flex-col h-screen w-full overflow-x-hidden'}>
			<WorkspaceSettingsHeader />
			<WorkspaceSettingsNavigationMobile />
			<main className={'overflow-y-auto w-full h-full flex gap-2 p-4'}>
				<WorkspaceSettingsNavigation />
				<div className={'w-full overflow-x-auto'}>{children}</div>
			</main>
		</div>
	)
}
