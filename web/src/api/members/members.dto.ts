import { zMongoId, zRequired } from '@/lib'
import { MemberType, TypeMemberWithUser } from '@/types'
import { z } from 'zod'

export const findAllMembersSchema = z.object({
	identifier: zMongoId().or(zRequired()),
	type: z.nativeEnum(MemberType),
	searchValue: z.string().optional(),
	take: z.number().positive().optional(),
	cursor: zMongoId().nullish()
})

export type FindAllMembersInput = z.infer<typeof findAllMembersSchema>

export type FindAllMembersResponse = {
	members: TypeMemberWithUser[]
	nextCursor?: string
}
