'use client'

import { ControllerRenderProps } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Select, SelectItem, SharedSelection } from '@heroui/react'
import { ChannelType } from '@/types'
import { useChannelsStore } from '@/features/chat'

interface IGroupSelectProps
	extends ControllerRenderProps<{ groupId: string }, 'groupId'> {}

export const GroupSelect = ({
	value,
	onChange,
	disabled
}: IGroupSelectProps) => {
	const groups = useChannelsStore((s) => s.channelsGroups)

	const options = groups.map((el) => ({
		key: el.id,
		label: el.name
	}))

	const [selected, setSelected] = useState(new Set([value]))

	const handleSelectionChange = (keys: SharedSelection) => {
		if (![...keys].length) {
			return
		}
		const selectedValue = [...keys][0] as ChannelType
		setSelected(new Set([selectedValue]))
		onChange?.(selectedValue)
	}

	useEffect(() => {
		const selectedValue = [...selected][0]
		if (value && !selectedValue) {
			setSelected(new Set([value]))
		}
	}, [selected, value])

	return (
		<Select
			selectedKeys={selected}
			size={'sm'}
			classNames={{
				trigger: 'rounded',
				popoverContent: 'rounded'
			}}
			onSelectionChange={handleSelectionChange}
			isDisabled={disabled}
		>
			{options.map((el) => (
				<SelectItem key={el.key} classNames={{ base: 'rounded' }}>
					{el.label}
				</SelectItem>
			))}
		</Select>
	)
}
