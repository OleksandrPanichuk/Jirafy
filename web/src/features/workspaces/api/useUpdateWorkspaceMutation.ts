'use client'
import { WorkspacesApi } from '@/api'
import { toast } from '@/features/toast'
import { useWorkspacesStore } from '@/features/workspaces'
import { useMutation } from '@/hooks'
import { useRouter } from 'next-nprogress-bar'

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
