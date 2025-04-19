import {
	CreateChannelInput,
	createChannelSchema,
	CreateChannelsGroupInput,
	createChannelsGroupSchema,
	UpdateChannelInput,
	updateChannelSchema,
	UpdateChannelsGroupInput,
	updateChannelsGroupSchema
} from '@/api'
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

const findByName = async (slug: string, name: string) => {
	return (
		await axios.get<TypeChannel>(
			ApiRoutes.CHANNELS.BY_NAME_AND_SLUG(slug, name)
		)
	).data
}

const create = async (input: CreateChannelInput) => {
	createChannelSchema.parse(input)
	return await axios.post<TypeChannel>(ApiRoutes.CHANNELS.ROOT, input)
}

const update = async (input: UpdateChannelInput) => {
	updateChannelSchema.parse(input)

	const dto = {
		name: input.name,
		type: input.type,
		groupId: input.groupId
	}

	return await axios.patch<TypeChannel>(ApiRoutes.CHANNELS.BY_ID(input.id), dto)
}

const createGroup = async (input: CreateChannelsGroupInput) => {
	createChannelsGroupSchema.parse(input)

	return await axios.post<TypeChannelsGroup>(
		ApiRoutes.CHANNELS.CHANNELS_GROUPS,
		input
	)
}

const updateGroup = async (input: UpdateChannelsGroupInput) => {
	updateChannelsGroupSchema.parse(input)

	const dto = {
		name: input.name
	}

	return await axios.patch<TypeChannelsGroup>(
		ApiRoutes.CHANNELS.CHANNELS_GROUP(input.id),
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
	findByName,
	create,
	update,
	createGroup,
	updateGroup,
	deleteGroup,
	delete: deleteChannel
} as const
