import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import {
	SendVerificationLinkInput,
	sendVerificationLinkSchema,
	VerifyEmailInput,
	verifyEmailSchema
} from './email.dto'

export const sendVerificationLink = async (dto: SendVerificationLinkInput) => {
	sendVerificationLinkSchema.parse(dto)
	return await axios.post<string>(ApiRoutes.EMAIL.SEND_LINK, dto)
}

export const verifyEmail = async (dto: VerifyEmailInput) => {
	verifyEmailSchema.parse(dto)
	return await axios.post<string>(ApiRoutes.EMAIL.VERIFY, dto)
}

export const EmailApi = {
	sendVerificationLink,
	verifyEmail
} as const
