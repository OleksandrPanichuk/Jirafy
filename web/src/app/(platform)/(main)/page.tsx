'use client'

import { Routes } from '@/constants'
import { useWorkspacesStore } from '@/features/workspaces'
import { redirect } from 'next/navigation'

const Page = () => {
	const workspaces = useWorkspacesStore((s) => s.workspaces)

	if (!workspaces.length) {
		return redirect(Routes.PROFILE)
	}

	const selectedWorkspace =
		workspaces.find((w) => w.members[0].isWorkspaceSelected) ?? workspaces[0]

	if (selectedWorkspace) {
		return redirect(Routes.WORKSPACE_BY_SLUG(selectedWorkspace.slug))
	}
	return null
}

export default Page
