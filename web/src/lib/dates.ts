import { format } from 'date-fns'

export function formatJoinDate(date: Date) {
	return format(date, 'MMMM d, yyyy')
}
