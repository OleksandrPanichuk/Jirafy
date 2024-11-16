'use client'

import { ProjectsApi } from '@/api'
import { useMutation } from '@tanstack/react-query'

export const useReorderProjectsMutation = () => {
	return useMutation({
		mutationFn: ProjectsApi.reorder
	})
}
