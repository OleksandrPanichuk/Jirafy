import { FormErrors } from '@/constants'
import { zMongoId, zRequired } from '@/lib'
import { InviteMemberRole, InviteState, MemberRole } from '@/types'
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
export type FindAllWorkspaceInvitesInput = z.infer<
	typeof findAllWorkspaceInvitesSchema
>

export const acceptInvitesSchema = z.object({
	invites: z.array(zMongoId())
})

export const rejectInvitesSchema = acceptInvitesSchema

export type AcceptInvitesInput = z.infer<typeof acceptInvitesSchema>
export type RejectInvitesInput = z.infer<typeof rejectInvitesSchema>

export const deleteInviteSchema = z.object({
	inviteId: zMongoId()
})

export type DeleteInviteInput = z.infer<typeof deleteInviteSchema>

export const updateInviteSchema = z.object({
	inviteId: zMongoId(),
	role: z.nativeEnum(InviteMemberRole)
})

export type UpdateInviteInput = z.infer<typeof updateInviteSchema>
