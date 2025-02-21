import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeUser } from '@/types'
import {
	UpdateCurrentUserInput,
	updateCurrentUserSchema,
	UpdateUserPasswordInput,
	updateUserPasswordSchema
} from './users.dto'

const current = async () => {
	return (await axios.get<TypeUser>(ApiRoutes.USERS.CURRENT)).data
}

const updateCurrent = async (input: UpdateCurrentUserInput) => {
	updateCurrentUserSchema.parse(input)

	return await axios.patch<TypeUser>(ApiRoutes.USERS.CURRENT, input)
}

const updatePassword = async (input: UpdateUserPasswordInput) => {
	updateUserPasswordSchema.parse(input)

	return await axios.patch<TypeUser>(ApiRoutes.USERS.CURRENT_PASSWORD, input)
}

export const UsersApi = {
	current,
	updateCurrent,
	updatePassword
} as const
