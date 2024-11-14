"use client"
import { ProjectsApi } from '@/api'
import { Routes } from '@/constants'
import { toast } from '@/features/notifications'
import { useProjectsStore } from '@/features/projects'
import { useCurrentWorkspaceSlug, useMutation } from '@/hooks'
import { useRouter } from 'next/navigation'



export const useCreateProjectMutation = () => {
	const router = useRouter()
	const workspaceSlug = useCurrentWorkspaceSlug()
	const addProject = useProjectsStore((s) => s.addProject)

	return useMutation({
		mutationFn: ProjectsApi.create,
		onSuccess: ({ data }) => {
			toast.success('Project created')

			addProject(data)

			router.push(Routes.PROJECT_ISSUES(workspaceSlug, data.id))
		}
	})
}
