import { Button } from '@/components/ui'
import Link from 'next/link'
import { Routes } from '@/constants'
import Image from 'next/image'

export const NoUserInvites = () => {
	return (
		<div className="w-full sm:w-[95%]">
			<div className={'flex flex-col items-center w-full'}>
				<Image
					src={'/invitation.svg'}
					width={225}
					height={172}
					className={'w-52 sm:w-60'}
					alt={'Back to home'}
				/>
				<h3 className={'mb-3 mt-6 text-xl font-semibold sm:mt-8'}>
					No pending invites
				</h3>
				<p className={'mb-7 px-5 text-tw-text-300 sm:mb-8 text-center'}>
					You can see here if someone invites you to a workspace
				</p>
				<Button variant={'primary'} size={'sm'} as={Link} href={Routes.ROOT}>
					Back to home
				</Button>
			</div>
		</div>
	)
}
