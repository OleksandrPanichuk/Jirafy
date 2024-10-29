import { OAUTH_DATA_COOKIE_NAME, Routes } from '@/constants'
import { SignUpForm } from '@/features/auth'
import { DecodedOAuthDataToken } from '@/types'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
	const oauthData = (await cookies()).get(OAUTH_DATA_COOKIE_NAME)
	if (!oauthData) {
		return redirect(Routes.SIGN_IN)
	}

	const defaultValues = jwtDecode<DecodedOAuthDataToken>(oauthData.value).user

	return <SignUpForm defaultValues={defaultValues} withoutOAuth />
}
