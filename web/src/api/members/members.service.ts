import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { MemberType, TypeMember } from '@/types'
import qs from 'query-string'
import {
	DeleteMemberInput,
	deleteMemberSchema,
	FindAllMembersInput,
	FindAllMembersResponse,
	findAllMembersSchema,
	UpdateMemberRoleInput,
	updateMemberRoleSchema
} from './members.dto'

const findAll = async (input: FindAllMembersInput) => {
	findAllMembersSchema.parse(input)
	const { identifier, type, ...query } = input

	let url: string

	switch (type) {
		case MemberType.WORKSPACE: {
			url = ApiRoutes.MEMBERS.BY_WORKSPACE_SLUG(identifier)
			break
		}

		default: {
			throw new Error('Incorrect type')
		}
	}

	const urlWithQuery = qs.stringifyUrl({
		url,
		query
	})

	return (await axios.get<FindAllMembersResponse>(urlWithQuery)).data
}

const updateRole = async (input: UpdateMemberRoleInput) => {
	updateMemberRoleSchema.parse(input)

	const { memberId, ...dto } = input

	return await axios.patch<TypeMember>(
		ApiRoutes.MEMBERS.BY_ID_ROLE(memberId),
		dto
	)
}

const deleteMember = async (input: DeleteMemberInput) => {
	deleteMemberSchema.parse(input)

	return await axios.delete<TypeMember>(ApiRoutes.MEMBERS.BY_ID(input.memberId))
}

export const MembersApi = {
	findAll,
	updateRole,
	delete: deleteMember
} as const
