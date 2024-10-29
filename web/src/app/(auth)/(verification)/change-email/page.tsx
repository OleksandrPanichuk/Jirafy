import { UserMenu, VerifyIdentityForm } from '@/features/auth'

const Page = () => {
	return (
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
				<VerifyIdentityForm />
			</div>
		</div>
	)
}

export default Page
