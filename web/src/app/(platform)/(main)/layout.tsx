'use client'

import { WorkspaceSidebar } from '@/components/common'
import { Routes } from '@/constants'
import { useWorkspacesStore } from '@/features/workspaces'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
	const workspaces = useWorkspacesStore((s) => s.workspaces)

	if (!workspaces.length) {
		return redirect(Routes.CREATE_WORKSPACE)
	}

	return (
		<div className="h-screen w-full overflow-hidden">
			<div className="flex h-full w-full overflow-hidden">
				<WorkspaceSidebar />
				<main>{children}</main>
			</div>
		</div>
	)
}

export default Layout
