'use client'

import { ProfileSidebarDesktop } from '@/features/sidebars'
import { PropsWithChildren } from 'react'

export const ProfileLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="h-screen w-full ">
			<div className="flex h-full w-full overflow-hidden bg-tw-bg-100">
				<ProfileSidebarDesktop />
				<>{children}</>
			</div>
		</div>
	)
}
