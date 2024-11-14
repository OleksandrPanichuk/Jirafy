import { FormErrors } from '@/constants'
import { zMongoId, zRequired } from '@/lib'
import { Network, TypeFile } from '@/types'
import { z } from 'zod'

export const createProjectSchema = z.object({
	cover: z
		.object({
			url: z.string().url()
		})
		.or(z.instanceof(File))
		.optional(),
	name: zRequired(FormErrors.required.projectName).min(
		3,
		FormErrors.length.projectName
	),
	description: z
		.string()
		.min(3, FormErrors.length.projectDescription)
		.optional(),

	identifier: zRequired(FormErrors.required.projectIdentifier).max(
		5,
		FormErrors.length.projectIdentifier
	),

	network: z.nativeEnum(Network, {
		invalid_type_error: FormErrors.invalid.projectNetwork
	}),
	emoji: z.string().optional(),
	leadId: zMongoId().optional(),
	workspaceId: zMongoId()
})

export type CreateProjectInput = Omit<
	z.infer<typeof createProjectSchema>,
	'cover'
> & {
	cover?: TypeFile
}
