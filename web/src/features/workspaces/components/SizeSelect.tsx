'use client'

import { CreateWorkspaceInput } from '@/api'
import { Select, SelectItem } from '@nextui-org/react'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { ControllerRenderProps } from 'react-hook-form'

interface ISizeSelectProps
	extends ControllerRenderProps<CreateWorkspaceInput, 'size'> {}

interface ISelectOption {
	label: string
	value: number
}

const selectOptions = [
	{
		label: 'Just myself',
		value: 1
	},
	{
		label: '2-10',
		value: 10
	},
	{
		label: '11-50',
		value: 50
	},
	{
		label: '51-200',
		value: 200
	},
	{
		label: '201-500',
		value: 500
	},
	{
		label: '500+',
		value: 1000
	}
] satisfies ISelectOption[]

export const SizeSelect = ({ value, onChange }: ISizeSelectProps) => {
	return (
		<Select
			placeholder="Select organization size"
			selectedKeys={value ? [`${value}`] : []}
			onChange={(e) => onChange(parseInt(e.target.value))}
			selectorIcon={<IconArrowsUpDown />}
			variant="flat"
			aria-label="Workspace size select"
			classNames={{
				trigger: 'rounded-md'
			}}
		>
			{selectOptions.map((option) => (
				<SelectItem key={option.value}>{option.label}</SelectItem>
			))}
		</Select>
	)
}
