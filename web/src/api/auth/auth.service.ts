import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeUser } from '@/types'
import {
	SignInInput,
	signInSchema,
	SignUpInput,
	signUpSchema,
	VerifyIdentityInput,
	verifyIdentitySchema
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

export const AuthApi = {
	signIn,
	signUp,
	signOut,
	googleOAuth,
	githubOAuth,
	verifyIdentity
} as const
