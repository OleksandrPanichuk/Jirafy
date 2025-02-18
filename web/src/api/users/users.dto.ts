import { FormErrors } from '@/constants'
import { zUploadedFile } from '@/lib'
import { z } from 'zod'

export const updateCurrentUserSchema = z.object({
	firstName: z.string().min(2, FormErrors.length.firstName).optional(),
	lastName: z.string().min(2, FormErrors.length.lastName).optional(),
	username: z.string().min(2, FormErrors.length.username).optional(),
	avatar: zUploadedFile().nullish(),
	coverImage: zUploadedFile().nullish()
})

export type UpdateCurrentUserInput = z.infer<typeof updateCurrentUserSchema>
