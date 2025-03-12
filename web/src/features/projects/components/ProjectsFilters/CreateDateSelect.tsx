'use client'

import { RangeDatePicker } from '@/features/dates'
import { useProjectsFiltersStore } from '@/features/projects'
import { CreateDateSelectOptions } from '@/features/projects/types'
import { cn } from '@/lib'
import { Radio, RadioGroup } from '@heroui/react'
import { endOfDay, startOfDay, subDays } from 'date-fns'
import { useState } from 'react'

interface ICreateDateSelectOption {
	searchValue?: string
}

const options = [
	{
		value: CreateDateSelectOptions.TODAY,
		label: 'Today'
	},
	{
		value: CreateDateSelectOptions.YESTERDAY,
		label: 'Yesterday'
	},
	{
		value: CreateDateSelectOptions.LAST_7_DAYS,
		label: 'Last 7 days'
	},
	{
		value: CreateDateSelectOptions.LAST_30_DAYS,
		label: 'Last 30 days'
	},
	{
		value: CreateDateSelectOptions.CUSTOM,
		label: 'Custom'
	}
]

export const CreateDateSelect = ({ searchValue }: ICreateDateSelectOption) => {
	const afterDate = useProjectsFiltersStore((s) => s.afterDate)
	const beforeDate = useProjectsFiltersStore((s) => s.beforeDate)

	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

	const setAfterDate = useProjectsFiltersStore((s) => s.setAfterDate)
	const setBeforeDate = useProjectsFiltersStore((s) => s.setBeforeDate)

	const selected = useProjectsFiltersStore((s) => s.selectedDateOption)
	const setSelected = useProjectsFiltersStore((s) => s.setSelectedDateOption)

	const handleValueChange = (value: CreateDateSelectOptions) => {
		if (value === selected) {
			setSelected(undefined)
			setBeforeDate(undefined)
			setAfterDate(undefined)
			return
		} else {
			setSelected(value)
		}

		switch (value) {
			case CreateDateSelectOptions.TODAY:
				setAfterDate(startOfDay(new Date()))
				setBeforeDate(endOfDay(new Date()))
				break
			case CreateDateSelectOptions.YESTERDAY:
				setAfterDate(startOfDay(subDays(new Date(), 1)))
				setBeforeDate(endOfDay(subDays(new Date(), 1)))
				break
			case CreateDateSelectOptions.LAST_7_DAYS:
				setAfterDate(startOfDay(subDays(new Date(), 7)))
				setBeforeDate(undefined)
				break
			case CreateDateSelectOptions.LAST_30_DAYS:
				setAfterDate(startOfDay(subDays(new Date(), 30)))
				setBeforeDate(undefined)
				break
			case CreateDateSelectOptions.CUSTOM:
				setIsDatePickerOpen(true)
				break
			default:
				setAfterDate(undefined)
				setBeforeDate(undefined)
				break
		}
	}

	const filteredOptions = options.filter((el) =>
		el.label.toLowerCase().includes(searchValue?.toLowerCase() ?? '')
	)

	if (!filteredOptions.length) {
		return (
			<p className="flex items-center w-full h-full text-xs text-tw-text-400">
				<i>No matches found</i>
			</p>
		)
	}

	return (
		<>
			<RangeDatePicker
				isOpen={isDatePickerOpen}
				onOpenChange={setIsDatePickerOpen}
				afterDate={afterDate}
				beforeDate={beforeDate}
				onChange={(value) => {
					setAfterDate(value.afterDate)
					setBeforeDate(value.beforeDate)
					setIsDatePickerOpen(false)
					setSelected(CreateDateSelectOptions.CUSTOM)
				}}
			/>
			<RadioGroup
				value={selected ?? null}
				className="mt-2"
				classNames={{
					wrapper: 'gap-4'
				}}
			>
				{filteredOptions.map((option) => (
					<div
						key={option.value}
						onMouseUp={() => {
							handleValueChange(option.value as CreateDateSelectOptions)
						}}
					>
						<Radio
							key={option.value}
							value={option.value}
							classNames={{
								base: cn(
									'flex w-full items-center rounded p-1.5 hover:bg-tw-bg-80 w-full max-w-none min-h-7 '
								),
								label:
									'flex-grow truncate text-xs text-tw-text-200 flex items-center '
							}}
							size="sm"
						>
							{option.label}
						</Radio>
					</div>
				))}
			</RadioGroup>
		</>
	)
}
