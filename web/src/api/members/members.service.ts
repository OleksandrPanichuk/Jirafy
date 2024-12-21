import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { MemberType } from '@/types'
import qs from 'query-string'
import {
	FindAllMembersInput,
	FindAllMembersResponse,
	findAllMembersSchema
} from './members.dto'

const findAll = async (input: FindAllMembersInput) => {
	findAllMembersSchema.parse(input)
	const { identifier, type, ...query } = input

	let url: string

	switch (type) {
		case MemberType.WORKSPACE: {
			url = ApiRoutes.MEMBERS.BY_WORKSPACE_SLUG(identifier)
			break;
		}

		default: {
			throw new Error("Incorrect type")
		}
	}

	const urlWithQuery = qs.stringifyUrl({
		url,
		query
	})

	return (await axios.get<FindAllMembersResponse>(urlWithQuery)).data
}

export const MembersApi = {
	findAll
} as const
