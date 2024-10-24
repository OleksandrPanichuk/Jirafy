import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeUser } from '@/types'
import {
	SignInInput,
	signInSchema,
	SignUpInput,
	signUpSchema,
	VerifyInput,
	verifySchema,
} from './auth.dto'

const signIn = async (input: SignInInput) => {
	signInSchema.parse(input)
	return await axios.post<TypeUser>(ApiRoutes.AUTH.SIGN_IN, input)
}
const signUp = async (input: SignUpInput) => {
	signUpSchema.parse(input)

	return await axios.post<TypeUser>(ApiRoutes.AUTH.SIGN_UP, input)
}

const verify = async (input: VerifyInput) => {
	verifySchema.parse(input)
	return await axios.post(ApiRoutes.AUTH.VERIFY, input)
}

const googleOAuth = () => {
	if (typeof window === 'undefined') return
	window.location.href = ApiRoutes.AUTH.GOOGLE
}

const githubOAuth = () => {
	if (typeof window === 'undefined') return
	window.location.href = ApiRoutes.AUTH.GITHUB
}

export const AuthApi = {
	signIn,
	signUp,
	googleOAuth,
	githubOAuth,
	verify
} as const
