'use client'

import { ChannelType } from '@/types'
import { Select, SelectItem, SharedSelection } from '@heroui/react'
import { useEffect, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

interface IChannelTypeSelectProps
	extends ControllerRenderProps<{ type: ChannelType }, 'type'> {}

export const ChannelTypeSelect = ({
	onChange,
	disabled,
	name,
	onBlur,
	ref,
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

	useEffect(() => {
		if (value !== undefined) {
			setSelected(new Set([value]))
		}
	}, [value])
	return (
		<Select
			selectedKeys={selected}
			size={'sm'}
			ref={ref}
			name={name}
			onBlur={onBlur}
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
