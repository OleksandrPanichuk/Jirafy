import { axios } from '@/lib'
import { TypeUser } from '@/types'
import { ApiRoutes } from '@/constants'

const currentUser = async () => {
	return (
		await axios.get<TypeUser>(ApiRoutes.USERS.CURRENT)
	).data
}

export const UsersApi = {
	currentUser
} as const
