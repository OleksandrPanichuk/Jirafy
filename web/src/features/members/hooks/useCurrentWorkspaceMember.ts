'use client'

import { useCurrentWorkspace } from '@/features/workspaces'

export const useCurrentWorkspaceMember = () => {
	const workspace = useCurrentWorkspace()
	return workspace?.members[0]
}
