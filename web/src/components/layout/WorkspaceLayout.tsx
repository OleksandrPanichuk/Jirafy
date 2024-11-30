'use client'

import { Routes } from '@/constants'
import { WorkspaceSidebarDesktop } from '@/features/sidebars'
import { useWorkspacesStore } from '@/features/workspaces'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export const WorkspaceLayout = ({ children }: PropsWithChildren) => {
	const workspaces = useWorkspacesStore((s) => s.workspaces)

	if (!workspaces.length) {
		return redirect(Routes.CREATE_WORKSPACE)
	}

	return (
		<div className="h-screen w-full overflow-y-hidden">
			<div className="flex h-full w-full overflow-y-hidden bg-tw-bg-100">
				<WorkspaceSidebarDesktop />
				<>{children}</>
			</div>
		</div>
	)
}
