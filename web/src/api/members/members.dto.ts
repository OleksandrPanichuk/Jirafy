import { zMongoId, zRequired } from '@/lib'
import { TypeMemberWithUser } from '@/types'
import { z } from 'zod'

export const findAllMembersSchema = z.object({
	slug: zRequired(),
	searchValue: z.string().optional(),
	take: z.number().positive().optional(),
	cursor: zMongoId().nullish()
})

export type FindAllMembersInput = z.infer<typeof findAllMembersSchema>

export type FindAllMembersResponse = {
	members: TypeMemberWithUser[]
	nextCursor?: string
}