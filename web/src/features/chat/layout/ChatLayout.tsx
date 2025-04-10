'use client'

import { breakpoints } from '@/constants'
import { ChatSidebarDesktop } from '@/features/sidebars'
import { useMediaQuery } from '@/hooks'
import { ReactNode } from 'react'

interface IChatLayoutProps {
	children: ReactNode
}

export const ChatLayout = ({ children }: IChatLayoutProps) => {
	const [isMobile] = useMediaQuery(breakpoints['max-md'], { fallback: [false] })

	if (isMobile) {
		return children
	}

	return (
		<>
			<div className="h-screen flex">
				<ChatSidebarDesktop />
				{children}
			</div>
		</>
	)
}
