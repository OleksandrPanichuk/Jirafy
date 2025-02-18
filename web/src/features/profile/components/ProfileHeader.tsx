'use client'
import { breakpoints } from '@/constants'
import { ProfileSidebarMobile } from '@/features/sidebars'
import { useMediaQuery } from '@/hooks'

export const ProfileHeader = () => {
	const [isMobile] = useMediaQuery(breakpoints['max-md'])

	if (!isMobile) {
		return null
	}

	return (
		<header
			className={
				'flex fixed bg-tw-bg-100 top-0 left-0 w-full z-50 items-center h-16  border-b border-tw-border-200  px-4 md:hidden'
			}
		>
			<ProfileSidebarMobile />
		</header>
	)
}
