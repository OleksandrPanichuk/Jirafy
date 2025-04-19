import { FormErrors } from '@/constants'
import { zMongoId, zRequired } from '@/lib'
import { ChannelType } from '@/types'
import { z } from 'zod'

export const createChannelSchema = z.object({
	name: zRequired(FormErrors.required.channelName),
	type: z.nativeEnum(ChannelType),
	groupId: zMongoId(),
	workspaceId: zMongoId()
})

export type CreateChannelInput = z.infer<typeof createChannelSchema>

export const updateChannelSchema = z.object({
	id: zMongoId(),
	name: zRequired(FormErrors.required.channelName),
	type: z.nativeEnum(ChannelType),
	groupId: zMongoId()
})

export type UpdateChannelInput = z.infer<typeof updateChannelSchema>

export const createChannelsGroupSchema = z.object({
	name: zRequired(FormErrors.required.channelsGroupName),
	workspaceId: zMongoId()
})

export type CreateChannelsGroupInput = z.infer<typeof createChannelsGroupSchema>

export const updateChannelsGroupSchema = z.object({
	id: zMongoId(),
	name: zRequired(FormErrors.required.channelsGroupName)
})

export type UpdateChannelsGroupInput = z.infer<typeof updateChannelsGroupSchema>
