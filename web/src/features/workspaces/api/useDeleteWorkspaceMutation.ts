'use client'
import { WorkspacesApi } from '@/api'
import { Routes } from '@/constants'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'
import { useRouter } from 'next/navigation'

export const useDeleteWorkspaceMutation = () => {
	const router = useRouter()

	return useMutation({
		mutationFn: WorkspacesApi.delete,
		onSuccess: () => {
			toast.success('Workspace deleted successfully')

			router.push(Routes.ROOT)
		}
	})
}
