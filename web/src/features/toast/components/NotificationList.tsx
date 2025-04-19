'use client'
import * as Portal from '@radix-ui/react-portal'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'

import { NotificationPositions, useNotificationsStore } from '@/features/toast'
import { cn } from '@/lib'

type Props = {
	children: ReactNode
}

const positions: Record<NotificationPositions, string> = {
	top: 'top-0 right-0 left-0 items-center',
	'top-right': 'top-0 right-0 items-end',
	'top-left': 'top-0 left-0 items-start',
	bottom: 'bottom-0 right-0 left-0 items-center',
	'bottom-right': 'bottom-0 right-0 items-end',
	'bottom-left': 'bottom-0 left-0 items-start'
}

export const NotificationList = ({ children }: Props) => {
	const position = useNotificationsStore((state) => state.position)
	const listRef = useRef<HTMLUListElement>(null)

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	}, [children])

	return (
		<Portal.Root>
			<LayoutGroup>
				<ul
					ref={listRef}
					aria-live="assertive"
					className={cn(
						'flex fixed z-[100000000000] flex-col gap-4 m-4 lg:m-8 pointer-events-none',
						positions[position]
					)}
				>
					<AnimatePresence initial={false}>{children}</AnimatePresence>
				</ul>
			</LayoutGroup>
		</Portal.Root>
	)
}
