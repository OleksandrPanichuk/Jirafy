import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import qs from 'query-string'
import {
	FindAllMembersInput,
	FindAllMembersResponse,
	findAllMembersSchema
} from './members.dto'

const findAll = async (input: FindAllMembersInput) => {
	findAllMembersSchema.parse(input)
	const { slug, ...query } = input

	const url = qs.stringifyUrl({
		url: ApiRoutes.MEMBERS.BY_WORKSPACE_SLUG(slug),
		query
	})

	return (await axios.get<FindAllMembersResponse>(url)).data
}

export const MembersApi = {
	findAll
} as const
