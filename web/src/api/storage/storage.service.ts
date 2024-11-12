import { ApiRoutes } from "@/constants"
import { axios } from "@/lib"
import { TypeFile } from "@/types"

const upload = async (file:File) => {
	const formData = new FormData()
	formData.append('file', file)
	return await axios.post<TypeFile>(ApiRoutes.STORAGE.UPLOAD, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

const deleteFile = async (key:string) => {
	return await axios.delete(ApiRoutes.STORAGE.DELETE(key))
}

export const StorageApi = {
	upload,
	delete: deleteFile
} as const
