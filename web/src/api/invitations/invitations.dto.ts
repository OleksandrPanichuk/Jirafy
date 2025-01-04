import { z } from 'zod'
import { MemberRole } from '@/types'
import { FormErrors } from '@/constants'
import { zRequired } from '@/lib'

export const inviteMembersSchema = z.array(
	z.object({
		email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email),
		role: z.nativeEnum(MemberRole).refine((role) => role !== MemberRole.OWNER, {
			message: 'Role cannot be OWNER'
		})
	})
)

export type InviteMembersInput = z.infer<typeof inviteMembersSchema>
