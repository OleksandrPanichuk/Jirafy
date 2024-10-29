import { FormErrors } from '@/constants'
import { zRequired } from '@/lib'
import { z } from 'zod'

export const sendVerificationLinkSchema = z.object({
	email: zRequired().email(FormErrors.invalid.email)
})

export type SendVerificationLinkInput = z.infer<
	typeof sendVerificationLinkSchema
>

export const verifyEmailSchema = z.object({
	token: zRequired().uuid(FormErrors.invalid.verificationToken)
})

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>
