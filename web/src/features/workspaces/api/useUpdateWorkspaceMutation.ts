'use client'

import { useMutation } from '@/hooks'
import { WorkspacesApi } from '@/api'
import { toast } from '@/features/notifications'
import { useWorkspacesStore } from '@/features/workspaces'
import { useRouter } from 'next/navigation'

export const useUpdateWorkspaceMutation = () => {
	const updateWorkspace = useWorkspacesStore((s) => s.updateWorkspace)
	const router = useRouter()
	return useMutation({
		mutationFn: WorkspacesApi.update,
		onSuccess: ({ data }) => {
			toast.success('Workspace updated')

			updateWorkspace(data.id, data)

			router.refresh()
		}
	})
}
