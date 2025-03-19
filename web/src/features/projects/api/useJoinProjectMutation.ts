'use client'

import { ProjectsApi } from '@/api'
import { Routes } from '@/constants'
import { toast } from '@/features/toast'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { useMutation } from '@/hooks'
import { useRouter } from 'next-nprogress-bar'
import { useProjectsStore } from '../providers'

export const useJoinProjectMutation = () => {
	const add = useProjectsStore((s) => s.addProject)
	const slug = useCurrentWorkspaceSlug()
	const router = useRouter()
	return useMutation({
		mutationFn: ProjectsApi.join,
		onSuccess: ({ data }) => {
			toast.success('You have joined the project')

			add(data)

			router.push(Routes.PROJECT_ISSUES(slug, data.id))
		}
	})
}
