'use client'
import { WorkspacesApi } from '@/api'
import { useMutation } from '@/hooks'

export const useSelectWorkspaceMutation = () => {
	return useMutation({
		mutationFn: WorkspacesApi.select
	})
}
