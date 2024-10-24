import { FormErrors } from '@/constants/errors'
import { zRequired } from '@/lib/validators'
import { isStrongPassword } from 'validator'
import { z } from 'zod'

export const verifySchema = z.object({ email: z.string().email() })

export type VerifyInput = z.infer<typeof verifySchema>

export const signInSchema = z.object({
	email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email),
	password: zRequired(FormErrors.required.password).min(
		8,
		FormErrors.length.password
	),
})

export type SignInInput = z.infer<typeof signInSchema>

export const signUpSchema = z
	.object({
		email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email),
		password: zRequired(FormErrors.required.password)
			.min(8, FormErrors.length.password)
			.refine(isStrongPassword, FormErrors.invalid.password),
		confirmPassword: zRequired(FormErrors.required.confirmPassword),
		firstName: zRequired(FormErrors.required.firstName).min(
			2,
			FormErrors.length.firstName
		),
		lastName: zRequired(FormErrors.required.lastName).min(
			2,
			FormErrors.length.lastName
		),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: FormErrors.match.passwords,
		path: ['confirmPassword'],
	})

export type SignUpInput = z.infer<typeof signUpSchema>
