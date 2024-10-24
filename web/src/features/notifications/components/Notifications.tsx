'use client'

import { useNotifications } from '@/features/notifications'

import { NotificationItem } from '@/features/notifications'
import { NotificationList } from '@/features/notifications'

export const Notifications = () => {
	const notifications = useNotifications()

	return (
		<NotificationList>
			{notifications.map(notification => (
				<NotificationItem key={notification.id} notification={notification} />
			))}
		</NotificationList>
	)
}
