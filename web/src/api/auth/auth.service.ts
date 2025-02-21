import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeUser } from '@/types'
import {
	ResetPasswordInput,
	resetPasswordSchema,
	SendResetPasswordTokenInput,
	sendResetPasswordTokenSchema,
	SignInInput,
	signInSchema,
	SignUpInput,
	signUpSchema,
	VerifyIdentityInput,
	verifyIdentitySchema,
	VerifyResetPasswordTokenInput,
	verifyResetPasswordTokenSchema
} from './auth.dto'

const signIn = async (input: SignInInput) => {
	signInSchema.parse(input)
	return await axios.post<TypeUser>(ApiRoutes.AUTH.SIGN_IN, input)
}
const signUp = async (input: SignUpInput) => {
	signUpSchema.parse(input)
	return await axios.post<TypeUser>(ApiRoutes.AUTH.SIGN_UP, input)
}

const signOut = async () => {
	return await axios.post(ApiRoutes.AUTH.SIGN_OUT)
}

const googleOAuth = () => {
	if (typeof window === 'undefined') return
	window.location.href = ApiRoutes.AUTH.GOOGLE
}

const githubOAuth = () => {
	if (typeof window === 'undefined') return
	window.location.href = ApiRoutes.AUTH.GITHUB
}

const verifyIdentity = async (input: VerifyIdentityInput) => {
	verifyIdentitySchema.parse(input)
	return await axios.post<boolean>(ApiRoutes.AUTH.VERIFY_IDENTITY, input)
}

const sendResetPasswordToken = async (input: SendResetPasswordTokenInput) => {
	sendResetPasswordTokenSchema.parse(input)
	return await axios.post(ApiRoutes.AUTH.FORGOT_PASSWORD, input)
}

const resetPassword = async (input: ResetPasswordInput) => {
	resetPasswordSchema.parse(input)
	return await axios.patch(ApiRoutes.AUTH.RESET_PASSWORD, input)
}

const verifyResetPasswordToken = async (
	input: VerifyResetPasswordTokenInput
) => {
	verifyResetPasswordTokenSchema.parse(input)

	return await axios.post(ApiRoutes.AUTH.VERIFY_RESET_PASSWORD_TOKEN, input)
}

export const AuthApi = {
	signIn,
	signUp,
	signOut,
	googleOAuth,
	githubOAuth,
	verifyIdentity,
	sendResetPasswordToken,
	resetPassword,
	verifyResetPasswordToken
} as const
