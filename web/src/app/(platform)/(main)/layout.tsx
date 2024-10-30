'use client'

import { Routes } from '@/constants'
import { useWorkspacesStore } from '@/features/workspaces'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
	const workspaces = useWorkspacesStore((s) => s.workspaces)


	if (!workspaces.length) {
		return redirect(Routes.CREATE_WORKSPACE)
	}

	return <>{children}</>
}

export default Layout
