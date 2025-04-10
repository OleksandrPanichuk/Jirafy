'use client'

import { ControllerRenderProps } from 'react-hook-form'
import { ChannelsInput } from '@/api'
import { Select, SelectItem, SharedSelection } from '@heroui/react'
import { useState } from 'react'
import { ChannelType } from '@/types'

interface IChannelTypeSelectProps
	extends ControllerRenderProps<ChannelsInput, 'type'> {}

export const ChannelTypeSelect = ({
	onChange,
	disabled,
	value
}: IChannelTypeSelectProps) => {
	const [selected, setSelected] = useState(new Set([value]))
	const handleSelectionChange = (keys: SharedSelection) => {
		if (![...keys].length) {
			return
		}
		const selectedValue = [...keys][0] as ChannelType
		setSelected(new Set([selectedValue]))
		onChange?.(selectedValue)
	}
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
			<SelectItem classNames={{ base: 'rounded' }} key={ChannelType.TEXT}>
				Text
			</SelectItem>
			<SelectItem classNames={{ base: 'rounded' }} key={ChannelType.VOICE}>
				Voice
			</SelectItem>
		</Select>
	)
}
