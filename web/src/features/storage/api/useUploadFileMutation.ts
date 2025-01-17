import { StorageApi } from '@/api'
import { toast } from '@/features/toast'
import { useMutation } from '@tanstack/react-query'

export const useUploadFileMutation = () => {
	return useMutation({
		mutationFn: StorageApi.upload,
		onSuccess: () => {
			toast.success('File uploaded successfully')
		}
	})
}
