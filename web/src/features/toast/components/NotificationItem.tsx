'use client'

import { motion, useIsPresent, type Variants } from 'framer-motion'
import { ReactNode } from 'react'
import {
	Notification,
	NotificationPositions,
	useNotificationsStore
} from '@/features/toast'
import { usePrefersReducedMotion, useUpdateEffect, useTimeoutFn } from '@/hooks'
import { cn } from '@/lib'
import {
	IconAlertTriangle,
	IconCircleCheck,
	IconInfoCircle,
	IconX
} from '@tabler/icons-react'

type INotificationItemProps = {
	notification: Notification
}

const getMotionDirectionAndPosition = (
	position: NotificationPositions,
	fromEdge = 24
) => {
	const directionPositions: NotificationPositions[] = ['top', 'bottom']
	const factorPositions: NotificationPositions[] = ['top-right', 'bottom-right']

	const direction = directionPositions.includes(position) ? 'y' : 'x'
	let factor = factorPositions.includes(position) ? 1 : -1

	if (position === 'bottom') factor = 1

	return {
		[direction]: factor * fromEdge
	}
}

const motionVariants: Variants = {
	initial: (position: NotificationPositions) => {
		return {
			opacity: 0,
			...getMotionDirectionAndPosition(position)
		}
	},
	animate: {
		opacity: 1,
		y: 0,
		x: 0,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1]
		}
	},
	exit: (position) => {
		return {
			opacity: 0,
			...getMotionDirectionAndPosition(position, 30),
			transition: {
				duration: 0.2,
				ease: [0.4, 0, 1, 1]
			}
		}
	}
}

const notificationStyleVariants: Record<
	NonNullable<Notification['type']>,
	string
> = {
	success: 'bg-[#132D21] border-[#20573E]',
	error: 'bg-[#3B1219] border-[#72232D]',
	info: 'bg-[#301C3B] border-[#54346B]',
	warning: 'bg-[#2D2305] border-[#524202]'
}

const notificationIcons: Record<
	NonNullable<Notification['type']>,
	ReactNode
> = {
	success: <IconCircleCheck />,
	error: <IconAlertTriangle />,
	info: <IconInfoCircle />,
	warning: <IconAlertTriangle />
}

const closeButtonStyleVariants: Record<
	NonNullable<Notification['type']>,
	string
> = {
	success: 'hover:bg-[#174933] active:bg-[#20573E]',
	error: 'hover:bg-[#611623] active:bg-[#72232D]',
	info: 'hover:bg-[#48295C] active:bg-[#54346B]',
	warning: 'hover:bg-[#433500] active:bg-[#524202]'
}

export const NotificationItem = ({
	notification: { id, autoHideDuration, message, onClose, type = 'info' }
}: INotificationItemProps) => {
	const isPresent = useIsPresent()
	const {
		dismissNotification,
		autoHideDuration: duration,
		position
	} = useNotificationsStore()
	const prefersReducedMotion = usePrefersReducedMotion()

	const handleDismiss = () => {
		if (isPresent) {
			dismissNotification(id)
		}
	}

	const [, cancel, reset] = useTimeoutFn(
		handleDismiss,
		autoHideDuration ?? duration
	)

	const onMouseEnter = () => cancel()
	const onMouseLeave = () => reset()

	useUpdateEffect(() => {
		if (!isPresent) {
			onClose?.()
		}
	}, [isPresent])

	return (
		<motion.li
			className={cn(
				'flex w-max items-center shadow px-4 py-3 rounded border transition-colors duration-100 min-w-[260px] text-sm pointer-events-auto',
				notificationStyleVariants[type]
			)}
			initial="initial"
			animate="animate"
			exit="exit"
			layout="position"
			custom={position}
			variants={!prefersReducedMotion ? motionVariants : {}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className="flex gap-2 items-center">
				{notificationIcons[type]}
				<span className="max-w-sm font-medium">{message}</span>
			</div>

			<div className="pl-4 ml-auto">
				<button
					onClick={handleDismiss}
					className={cn(
						'p-1 rounded transition-colors duration-100',
						closeButtonStyleVariants[type]
					)}
				>
					<IconX />
				</button>
			</div>
		</motion.li>
	)
}
