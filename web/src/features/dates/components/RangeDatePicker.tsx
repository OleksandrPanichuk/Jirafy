'use client'

import { breakpoints } from '@/constants'
import { useMediaQuery } from '@/hooks'
import { Modal, ModalContent, RangeCalendar, RangeValue } from '@heroui/react'
import {
	CalendarDate,
	getLocalTimeZone,
	parseDate,
	today
} from '@internationalized/date'
import { endOfDay, startOfDay } from 'date-fns'
import { useState } from 'react'

interface IRangeDatePickerProps {
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void

	afterDate?: Date
	beforeDate?: Date

	onChange?: (value: { afterDate?: Date; beforeDate?: Date }) => void
}

const formatDate = (date: Date) => {
	return date.toISOString().split('T')[0]
}

export const RangeDatePicker = ({
	isOpen,
	onOpenChange,
	afterDate,
	beforeDate,
	onChange
}: IRangeDatePickerProps) => {
	const [isMobile] = useMediaQuery(breakpoints['max-sm'])

	const [value, setValue] = useState({
		start: afterDate
			? parseDate(formatDate(afterDate))
			: beforeDate
				? parseDate(formatDate(beforeDate))
				: today(getLocalTimeZone()),
		end: beforeDate
			? parseDate(formatDate(beforeDate))
			: afterDate
				? parseDate(formatDate(afterDate))
				: today(getLocalTimeZone())
	})

	const handleValueChange = (value: RangeValue<CalendarDate>) => {
		setValue(value)

		const { start, end } = value

		onChange?.({
			afterDate: start
				? startOfDay(start.toDate(getLocalTimeZone()))
				: undefined,
			beforeDate: end ? endOfDay(end.toDate(getLocalTimeZone())) : undefined
		})
	}

	if (!isOpen) {
		return null
	}

	return (
		<Modal
			isOpen={isOpen}
			classNames={{
				wrapper: 'z-[100000]',
				backdrop: 'z-[100000]'
			}}
			onOpenChange={onOpenChange}
			placement="center"
		>
			<ModalContent className="min-h-[300px] max-w-none w-fit sm:min-w-[512px]">
				<RangeCalendar
					visibleMonths={isMobile ? 1 : 2}
					maxValue={today(getLocalTimeZone())}
					value={value}
					onChange={handleValueChange}
				/>
			</ModalContent>
		</Modal>
	)
}
