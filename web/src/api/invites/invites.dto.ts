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

export const findAllInvitesSchema = z
	.object({
		state: z.nativeEnum(InviteState).optional(),
		projectId: zMongoId().optional(),
		userId: zMongoId().optional(),
		workspaceId: zMongoId().optional()
	})
	.refine(
		(data) => {
			const { projectId, workspaceId, userId } = data;
			
			if (!projectId && !workspaceId && !userId) {
				return false;
			}

			const fields = [projectId, workspaceId, userId]
			return fields.filter(Boolean).length === 1
		},
		{
			message:
				'Exactly one of projectId, workspaceId, or userId must be defined.',
			path: ['projectId', 'workspaceId', 'userId']
		}
	)

export type FindAllInvitesInput = z.infer<typeof findAllInvitesSchema>

export type FindAllUserInvitesInput = Omit<
	FindAllInvitesInput,
	'workspaceId' | 'projectId'
>

export type FindAllWorkspaceInvitesInput = Omit<
	FindAllInvitesInput,
	'userId' | 'projectId'
>

export type FindAllProjectInvitesInput = Omit<
	FindAllInvitesInput,
	'userId' | 'workspaceId'
>
