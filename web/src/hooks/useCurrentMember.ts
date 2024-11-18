"use client"

import { useCurrentWorkspace } from "@/features/workspaces"

export const useCurrentMember = () => {
	const workspace = useCurrentWorkspace()
	return workspace?.members[0]
}