import { StorageApi } from '@/api'
import { toast } from '@/features/toast'
import { useMutation } from '@/hooks'

export const useDeleteFileMutation = () => {
	return useMutation({
		mutationFn: StorageApi.delete,
		onSuccess: () => {
			toast.success('File deleted successfully')
		}
	})
}
