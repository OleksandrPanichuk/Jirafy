import type {
	CreateNotificationInput,
	NotificationsState,
	NotificationTypes
} from '@/features/toast'
import { nanoid } from 'nanoid'
import { create } from 'zustand'

const getHandlerItem = (
	notification: CreateNotificationInput & { message: string },
	state: NotificationsState,
	type: NotificationTypes
): Partial<NotificationsState> => ({
	notifications: [
		...state.notifications,
		{ id: nanoid(), ...notification, type }
	],
	position: notification.position ?? state.position
})

export const useNotificationsStore = create<NotificationsState>((set) => ({
	notifications: [],
	position: 'bottom-right',
	autoHideDuration: 6000,

	handler: {
		success: (msg, opt) =>
			set((s) => getHandlerItem({ ...opt, message: msg }, s, 'success')),
		error: (msg, opt) =>
			set((s) => getHandlerItem({ ...opt, message: msg }, s, 'error')),
		warning: (msg, opt) =>
			set((s) => getHandlerItem({ ...opt, message: msg }, s, 'warning')),
		info: (msg, opt) =>
			set((s) => getHandlerItem({ ...opt, message: msg }, s, 'info'))
	},
	dismissNotification: (id) =>
		set((state) => ({
			notifications: state.notifications.filter(
				(notification) => notification.id !== id
			)
		})),

	setNotificationPosition: (position) => set(() => ({ position })),

	setNotificationDuration: (duration) =>
		set(() => ({ autoHideDuration: duration }))
}))
export const useNotifications = () =>
	useNotificationsStore((state) => state.notifications)

export const toast = useNotificationsStore.getState().handler
