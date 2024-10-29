import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeUser } from '@/types'
import {
	ChangeEmailInput,
	changeEmailSchema,
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

export const changeEmail = async (dto: ChangeEmailInput) => {
	changeEmailSchema.parse(dto)
	return await axios.patch<TypeUser>(ApiRoutes.EMAIL.CHANGE, dto)
}

export const EmailApi = {
	sendVerificationLink,
	verifyEmail,
	changeEmail
} as const
