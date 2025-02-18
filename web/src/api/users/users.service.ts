import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeUser } from '@/types'
import { UpdateCurrentUserInput, updateCurrentUserSchema } from './users.dto'

const current = async () => {
	return (await axios.get<TypeUser>(ApiRoutes.USERS.CURRENT)).data
}

const updateCurrent = async (input: UpdateCurrentUserInput) => {
	updateCurrentUserSchema.parse(input)

	return await axios.put<TypeUser>(ApiRoutes.USERS.CURRENT, input)
}

export const UsersApi = {
	current,
	updateCurrent
} as const
