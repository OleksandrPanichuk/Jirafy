'use client'

import { Button } from '@/features/shared'
import { cn } from '@/lib'
import { InviteState } from '@/types'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@heroui/react"
import { useEffect, useMemo, useState } from 'react'

type TypeInviteState = 'ALL' | `${InviteState}`

interface IMemberRolesSelectProps {
	value?: InviteState
	onChange: (value: `${InviteState}` | undefined) => void
	isDisabled?: boolean
	classNames?: {
		trigger?: string
	}
}

const options = [
	{
		key: 'ALL',
		value: 'All states'
	},
	{
		key: InviteState.ACCEPTED,
		value: 'Accepted'
	},
	{
		key: InviteState.PENDING,
		value: 'Pending'
	},
	{
		key: InviteState.REJECTED,
		value: 'Rejected'
	}
]

export const InvitesStatusSelect = ({
	onChange,
	isDisabled,
	classNames,
	value
}: IMemberRolesSelectProps) => {
	const [selected, setSelected] = useState<Set<TypeInviteState>>(
		new Set(value ? [`${value}` as TypeInviteState] : ['ALL'])
	)

	const selectedValue = useMemo(
		() => options.find((option) => option.key === [...selected][0])?.value,
		[selected]
	)

	const handleSelectionChange = (key: Set<TypeInviteState>) => {
		const value = [...key][0]

		onChange(value === 'ALL' ? undefined : value)
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
			isDisabled={isDisabled}
		>
			<DropdownTrigger>
				<Button
					className={cn('min-w-20', classNames?.trigger)}
					variant={'ghost'}
					size="sm"
				>
					<p>{selectedValue}</p>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selected}
				onSelectionChange={(key) =>
					handleSelectionChange(key as Set<TypeInviteState>)
				}
			>
				{options.map((option) => {
					return (
						<DropdownItem
							key={option.key}
							textValue={option.value}
							className="hover:!bg-tw-bg-80"
						>
							<p>{option.value}</p>
						</DropdownItem>
					)
				})}
			</DropdownMenu>
		</Dropdown>
	)
}
