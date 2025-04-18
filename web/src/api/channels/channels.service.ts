import {
	ChannelsGroupInput,
	channelsGroupSchema,
	ChannelsInput,
	channelsSchema
} from '@/api/channels/channels.dto'
import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import {
	TypeChannel,
	TypeChannelsGroup,
	TypeChannelsGroupWithChannels
} from '@/types'

const findAll = async (slug: string) => {
	return (
		await axios.get<TypeChannelsGroupWithChannels[]>(
			ApiRoutes.CHANNELS.BY_WORKSPACE_SLUG(slug)
		)
	).data
}

const create = async (input: ChannelsInput) => {
	channelsSchema.parse(input)

	return await axios.post<TypeChannel>(ApiRoutes.CHANNELS.ROOT, input)
}

const createGroup = async (input: ChannelsGroupInput) => {
	channelsGroupSchema.parse(input)

	return await axios.post<TypeChannelsGroup>(
		ApiRoutes.CHANNELS.CHANNELS_GROUPS,
		input
	)
}

const updateGroup = async (input: ChannelsGroupInput) => {
	channelsGroupSchema.parse(input)

	if (!input.groupId) {
		throw new Error('Group ID is required for updating a group')
	}

	const dto = {
		name: input.name
	}

	return await axios.patch<TypeChannelsGroup>(
		ApiRoutes.CHANNELS.CHANNELS_GROUP(input.groupId),
		dto
	)
}

const deleteGroup = async (groupId: string) => {
	return await axios.delete(ApiRoutes.CHANNELS.CHANNELS_GROUP(groupId))
}

const deleteChannel = async (channelId: string) => {
	return await axios.delete(ApiRoutes.CHANNELS.BY_ID(channelId))
}

export const ChannelsApi = {
	findAll,
	create,
	createGroup,
	updateGroup,
	deleteGroup,
	delete: deleteChannel
} as const
