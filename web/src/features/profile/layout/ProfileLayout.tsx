'use client'

import { ProfileHeader } from '@/features/profile'
import { ProfileSidebarDesktop } from '@/features/sidebars'
import { PropsWithChildren } from 'react'

export const ProfileLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="h-screen w-full ">
			<div className="flex h-full w-full overflow-hidden  bg-tw-bg-100">
				<ProfileSidebarDesktop />
				<div className="w-full">
					<ProfileHeader />
					<main className={'w-full pt-16 md:pt-0 overflow-y-auto h-full'}>
						{children}
					</main>
				</div>
			</div>
		</div>
	)
}
