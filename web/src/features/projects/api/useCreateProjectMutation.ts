'use client'
import { ProjectsApi } from '@/api'
import { Routes } from '@/constants'
import { useAuth } from '@/features/auth'
import { useProjectsStore } from '@/features/projects'
import { toast } from '@/features/toast'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { useMutation } from '@/hooks'
import { MemberRole } from '@/types'
import { useRouter } from 'next-nprogress-bar'

export const useCreateProjectMutation = () => {
	const router = useRouter()
	const user = useAuth((s) => s.user)
	const workspaceSlug = useCurrentWorkspaceSlug()
	const addProject = useProjectsStore((s) => s.addProject)
	const count = useProjectsStore((s) => s.projects.length)

	return useMutation({
		mutationFn: ProjectsApi.create,
		onSuccess: ({ data }, variables) => {
			toast.success('Project created')
			// TODO: refetch all projects
			addProject({
				...data,
				members: [
					{
						role: MemberRole.ADMIN,
						defaultAssignee: true,
						isLead: variables.leadId ? user?.id === variables.leadId : true,
						projectOrder: count + 1
					}
				]
			})

			router.push(Routes.PROJECT_ISSUES(workspaceSlug, data.id))
		}
	})
}
