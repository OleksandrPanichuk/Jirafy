import { FormErrors } from '@/constants'
import { zMongoId, zRequired } from '@/lib'
import { z } from 'zod'

export const createWorkspaceSchema = z.object({
	name: zRequired(FormErrors.required.workspaceName).min(
		3,
		FormErrors.length.workspaceName
	),
	slug: zRequired(FormErrors.required.workspaceSlug).min(
		3,
		FormErrors.length.workspaceSlug
	),
	size: z
		.number({ required_error: FormErrors.required.workspaceSize })
		.positive({ message: FormErrors.invalid.workspaceSize })
})

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>

export const selectWorkspaceSchema = z.object({
	workspaceId: zMongoId()
})

export type SelectWorkspaceInput = z.infer<typeof selectWorkspaceSchema>

export const deleteWorkspaceSchema = selectWorkspaceSchema
export type DeleteWorkspaceInput = z.infer<typeof deleteWorkspaceSchema>