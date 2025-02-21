'use state'

import { useQuery, UseQueryHookProps } from '@/hooks'
import { WorkspacesApi } from '@/api'
import { TypeWorkspaceWithMembers } from '@/types'

export const useWorkspacesQuery = (
	options: UseQueryHookProps<TypeWorkspaceWithMembers[]> = {}
) => {
	return useQuery({
		queryKey: ['workspaces', 'all'],
		queryFn: () => WorkspacesApi.findAll(),
		...options
	})
}
