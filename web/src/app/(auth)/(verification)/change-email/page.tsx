import { IDENTITY_VERIFIED_COOKIE_NAME } from '@/constants'
import {
	ChangeEmailForm,
	UserMenu,
	VerifyIdentityForm,
	VerifyIdentityProvider
} from '@/features/auth'
import { getCookie } from '@/lib/cookies'
import { DecodedIdentityToken } from '@/types'
import { jwtDecode } from 'jwt-decode'

const Page = async () => {
	const token = await getCookie(IDENTITY_VERIFIED_COOKIE_NAME)

	const decoded = token ? jwtDecode<DecodedIdentityToken>(token) : null

	return (
		<VerifyIdentityProvider initialVerified={decoded?.verified}>
			<div className={'p-4 md:p-8 flex flex-col'}>
				<div className="max-w-screen-xl">
					<div className="flex justify-end w-full">
						<UserMenu onlySignOut />
					</div>
				</div>
				<div
					className={
						'w-full mx-auto flex mt-20 justify-center items-center max-w-lg'
					}
				>
					<ChangeEmailForm />
					<VerifyIdentityForm />
				</div>
			</div>
		</VerifyIdentityProvider>
	)
}

export default Page
