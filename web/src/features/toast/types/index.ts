import { ReactNode } from 'react'

export type NotificationTypes = 'success' | 'error' | 'warning' | 'info'

export type Notification = {
	id: string
	message: string
	autoHideDuration?: number

	type?: NotificationTypes

	onClose?: () => void

	action?: ReactNode

	position?: NotificationPositions
}

export type CreateNotificationInput = Omit<
	Notification,
	'id' | 'type' | 'message'
>

export type NotificationsState = {
	notifications: Notification[]
	position: NotificationPositions
	autoHideDuration: number
	handler: {
		success: (msg: string, options?: CreateNotificationInput) => void
		error: (msg: string, options?: CreateNotificationInput) => void
		warning: (msg: string, options?: CreateNotificationInput) => void
		info: (msg: string, options?: CreateNotificationInput) => void
	}
	dismissNotification: (id: Notification['id']) => void
	setNotificationPosition: (position: NotificationPositions) => void
	setNotificationDuration: (duration: number) => void
}

export type NotificationPositions =
	| 'top'
	| 'top-right'
	| 'top-left'
	| 'bottom'
	| 'bottom-right'
	| 'bottom-left'
