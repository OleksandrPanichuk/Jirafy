import { FormErrors } from '@/constants/errors'
import { zRequired } from '@/lib/validators'
import { isStrongPassword } from 'validator'
import { z } from 'zod'

export const signInSchema = z.object({
	email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email),
	password: zRequired(FormErrors.required.password).min(
		8,
		FormErrors.length.password
	)
})

export type SignInInput = z.infer<typeof signInSchema>

export const signUpSchema = z
	.object({
		email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email),
		password: zRequired(FormErrors.required.password)
			.min(8, FormErrors.length.password)
			.refine(isStrongPassword, FormErrors.invalid.password),
		confirmPassword: zRequired(FormErrors.required.confirmPassword),
		username: zRequired(FormErrors.required.username).min(
			2,
			FormErrors.length.username
		),
		firstName: zRequired(FormErrors.required.firstName).min(
			2,
			FormErrors.length.firstName
		),
		avatar: z
			.object({
				url: z.string().url()
			})
			.optional(),
		lastName: zRequired(FormErrors.required.lastName).min(
			2,
			FormErrors.length.lastName
		),
		verified: z.boolean().optional()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: FormErrors.match.passwords,
		path: ['confirmPassword']
	})

export type SignUpInput = z.infer<typeof signUpSchema>

export const verifyIdentitySchema = z.object({
	password: zRequired(FormErrors.required.password).min(
		8,
		FormErrors.length.password
	)
})

export type VerifyIdentityInput = z.infer<typeof verifyIdentitySchema>

export const sendResetPasswordTokenSchema = z.object({
	email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email)
})

export type SendResetPasswordTokenInput = z.infer<
	typeof sendResetPasswordTokenSchema
>

export const verifyResetPasswordTokenSchema = z.object({
	token: zRequired()
})

export type VerifyResetPasswordTokenInput = z.infer<
	typeof verifyResetPasswordTokenSchema
>

export const resetPasswordSchema = z
	.object({
		password: zRequired(FormErrors.required.password)
			.min(8, FormErrors.length.password)
			.refine(isStrongPassword, FormErrors.invalid.password),
		confirmPassword: zRequired(FormErrors.required.confirmPassword),
		token: zRequired()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: FormErrors.match.passwords,
		path: ['confirmPassword']
	})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
