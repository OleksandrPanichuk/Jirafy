import { cookies } from 'next/headers'
import { OAUTH_DATA_COOKIE_NAME, Routes } from '@/constants'
import { SignUpForm } from '@/features/auth'
import { redirect } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { TypeUser } from '@/types'

export default async function Page() {
	const oauthData = (await cookies()).get(OAUTH_DATA_COOKIE_NAME)
	if (!oauthData) {
		return redirect(Routes.SIGN_IN)
	}

	const defaultValues = jwtDecode<{ user: Partial<TypeUser> }>(
		oauthData.value
	).user

	return <SignUpForm defaultValues={defaultValues} withoutOAuth />
}
