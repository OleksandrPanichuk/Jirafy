import { FormErrors } from '@/constants'
import { zMongoId, zRequired } from '@/lib'
import { z } from 'zod'
import { ChannelType } from '@/types'

export const channelsGroupSchema = z.object({
	name: zRequired(FormErrors.required.channelsGroup),
	workspaceId: zMongoId().optional(),
	groupId: zMongoId().optional()
})

export type ChannelsGroupInput = z.infer<typeof channelsGroupSchema>

export const channelsSchema = z.object({
	name: zRequired(FormErrors.required.channels),
	type: z.nativeEnum(ChannelType),
	workspaceId: zMongoId(),
	groupId: zMongoId()
})

export type ChannelsInput = z.infer<typeof channelsSchema>
