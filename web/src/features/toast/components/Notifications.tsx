'use client'

import { useNotifications } from '@/features/toast'

import { NotificationItem, NotificationList } from '@/features/toast'

export const Notifications = () => {
	const notifications = useNotifications()

	return (
		<NotificationList>
			{notifications.map((notification) => (
				<NotificationItem key={notification.id} notification={notification} />
			))}
		</NotificationList>
	)
}
