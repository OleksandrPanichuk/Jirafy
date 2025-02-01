import { zMongoId, zRequired } from '@/lib'
import { InviteMemberRole, MemberType, TypeMemberWithUser } from '@/types'
import { z } from 'zod'

export const findAllMembersSchema = z.object({
	identifier: zMongoId().or(zRequired()),
	type: z.nativeEnum(MemberType),
	searchValue: z.string().optional(),
	take: z.number().positive().optional(),
	cursor: zMongoId().nullish(),
	withUser: z.boolean().optional()
})

export const deleteMemberSchema = z.object({
	memberId: zMongoId()
})

const updateMemberSchemaBase = z.object({
	memberId:zMongoId()
})

export const updateMemberRoleSchema = updateMemberSchemaBase.extend({
	role: z.nativeEnum(InviteMemberRole)
})

export type FindAllMembersInput = z.infer<typeof findAllMembersSchema>

export type FindAllMembersResponse = {
	members: TypeMemberWithUser[]
	nextCursor?: string
}

export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>



export type DeleteMemberInput = z.infer<typeof deleteMemberSchema>