'use client'

import { Network } from '@/types'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@heroui/react"
import { IconGlobe, IconLock, TablerIcon } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

interface INetworkSelectProps extends ControllerRenderProps {}

type NetworkOption = {
	label: string
	description: string
	value: Network
	icon: TablerIcon
}

const options = [
	{
		label: 'Public',
		icon: IconGlobe,
		description: 'Anyone in the workspace can join',
		value: Network.PUBLIC
	},
	{
		label: 'Private',
		icon: IconLock,
		description: 'Accessible only by invite',
		value: Network.PRIVATE
	}
] satisfies NetworkOption[]

export const NetworkSelect = ({ onChange, value }: INetworkSelectProps) => {
	const [selected, setSelected] = useState<Set<Network>>(
		new Set([Network.PUBLIC])
	)

	const selectedValue = options.find(
		(option) => option.value === [...selected][0]
	)!
	const Icon = selectedValue.icon

	const handleSelectionChange = (key: Set<Network>) => {
		const value = [...key][0]

		onChange(value)
		setSelected(key)
	}

	useEffect(() => {
		const selectedValue = [...selected][0]
		if (value && !selectedValue) {
			setSelected(new Set([value]))
		}
	}, [selected, value])

	return (
		<Dropdown
			classNames={{
				content: 'rounded-md border border-tw-border-400 bg-tw-bg-100 ',
				base: 'mr-2'
			}}
		>
			<DropdownTrigger>
				<Button
					className="w-[90px] rounded-md bg-tw-bg-100 border-tw-border-300 border-[0.5px] px-2 py-0.5 hover:bg-tw-border-300"
					variant="bordered"
					size="sm"
				>
					<div className="flex gap-2 items-center">
						<Icon className="size-6" />
						<p>{selectedValue.label}</p>
					</div>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Network selection"
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selected}
				onSelectionChange={(key) => handleSelectionChange(key as Set<Network>)}
			>
				{options.map((option) => {
					const Icon = option.icon
					return (
						<DropdownItem
							key={option.value}
							textValue={option.label}
							className="hover:!bg-tw-bg-80"
							startContent={<Icon className="size-6" />}
						>
							<div className="flex flex-col gap-1">
								<p>{option.label}</p>
								<p className="text-tw-text-300 text-xs">{option.description}</p>
							</div>
						</DropdownItem>
					)
				})}
			</DropdownMenu>
		</Dropdown>
	)
}
