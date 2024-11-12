import { StorageApi } from '@/api'
import { toast } from '@/features/notifications'
import { useMutation } from '@/hooks'

export const useDeleteFileMutation = () => {
	return useMutation({
		mutationFn: StorageApi.delete,
		onSuccess: () => {
			toast.success('File deleted successfully')
		}
	})
}
