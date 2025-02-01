import { FormErrors } from '@/constants'
import { zMongoId, zRequired } from '@/lib'
import { InviteState, MemberRole } from '@/types'
import { z } from 'zod'

export const inviteMembersSchema = z.array(
	z.object({
		email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email),
		role: z.nativeEnum(MemberRole).refine((role) => role !== MemberRole.OWNER, {
			message: 'Role cannot be OWNER'
		})
	})
)

export type InviteMembersInput = z.infer<typeof inviteMembersSchema>


export const findAllUserInvitesSchema = z.object({
	state: z.nativeEnum(InviteState).optional()
})

export const findAllWorkspaceInvitesSchema = z.object({
	state: z.nativeEnum(InviteState).optional(),
	workspaceId: zMongoId()
})


export type FindAllUserInvitesInput = z.infer<typeof findAllUserInvitesSchema>
export type FindAllWorkspaceInvitesInput = z.infer<typeof findAllWorkspaceInvitesSchema>