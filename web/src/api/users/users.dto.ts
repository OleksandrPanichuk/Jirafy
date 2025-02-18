import { FormErrors } from '@/constants'
import { zRequired, zUploadedFile } from '@/lib'
import { isStrongPassword } from 'validator'
import { z } from 'zod'

export const updateCurrentUserSchema = z.object({
	firstName: z.string().min(2, FormErrors.length.firstName).optional(),
	lastName: z.string().min(2, FormErrors.length.lastName).optional(),
	username: z.string().min(2, FormErrors.length.username).optional(),
	avatar: zUploadedFile().nullish(),
	coverImage: zUploadedFile().nullish()
})

export type UpdateCurrentUserInput = z.infer<typeof updateCurrentUserSchema>

export const updateUserPasswordSchema = z
	.object({
		currentPassword: z.string().min(6, FormErrors.length.password),
		newPassword: zRequired(FormErrors.required.password)
			.min(8, FormErrors.length.password)
			.refine(isStrongPassword, FormErrors.invalid.password),
		confirmPassword: zRequired(FormErrors.required.confirmPassword)
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: FormErrors.match.passwords,
		path: ['confirmPassword']
	})

export type UpdateUserPasswordInput = z.infer<typeof updateUserPasswordSchema>
