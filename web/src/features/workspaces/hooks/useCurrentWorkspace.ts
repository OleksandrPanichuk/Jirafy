'use client'

import {
	useCurrentWorkspaceSlug,
	useWorkspacesStore
} from '@/features/workspaces'

export const useCurrentWorkspace = () => {
	const slug = useCurrentWorkspaceSlug()
	const workspaces = useWorkspacesStore((s) => s.workspaces)
	return workspaces.find((w) => w.slug === slug)!
}
