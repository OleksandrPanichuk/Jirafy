'use client'
import { WorkspacesApi } from '@/api'
import { Routes } from '@/constants'
import { toast } from '@/features/toast'
import { useWorkspacesStore } from '@/features/workspaces'
import { useMutation } from '@/hooks'
import { useRouter } from 'next/navigation'

export const useCreateWorkspaceMutation = () => {
	const addWorkspace = useWorkspacesStore((s) => s.addWorkspace)
	const router = useRouter()
	return useMutation({
		mutationFn: WorkspacesApi.create,
		onSuccess: ({ data }) => {
			toast.success('Workspace created successfully')
			addWorkspace(data)

			router.refresh()

			router.push(Routes.WORKSPACE_BY_SLUG(data.slug))
		}
	})
}
