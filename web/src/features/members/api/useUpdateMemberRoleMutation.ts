import { useMutation } from '@/hooks'
import { MembersApi } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/features/toast'


export const useUpdateMemberRoleMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn:MembersApi.updateRole,
		onSuccess:({data}) => {
			toast.success('Member role updated successfully')
			queryClient.invalidateQueries({
				queryKey: ["members", 'all', {
					identifier: data.workspaceId || data.projectId || data.pageId
				}]
			})
		}
	})
}