import { FormErrors } from '@/constants'
import { zMongoId, zRequired, zUploadedFile } from '@/lib'
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

export const updateWorkspaceSchema = z.object({
	name: zRequired().min(3, FormErrors.length.workspaceName).optional(),
	size: z.number().positive(FormErrors.invalid.workspaceSize).optional(),
	logo: zUploadedFile().nullish(),
	workspaceId: zMongoId()
})

export const selectWorkspaceSchema = z.object({
	workspaceId: zMongoId()
})

export const deleteWorkspaceSchema = selectWorkspaceSchema

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>
export type SelectWorkspaceInput = z.infer<typeof selectWorkspaceSchema>

export type DeleteWorkspaceInput = z.infer<typeof deleteWorkspaceSchema>
