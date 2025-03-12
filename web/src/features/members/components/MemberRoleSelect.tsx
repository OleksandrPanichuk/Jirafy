'use client'

import { memberRolesMap } from '@/constants'
import { Button } from '@/features/shared'
import { cn } from '@/lib'
import { MemberRole } from '@/types'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@heroui/react"
import { IconChevronDown } from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'

interface IMemberRolesSelectProps {
	value: MemberRole
	onChange: (value: MemberRole) => void
	isDisabled?: boolean
	classNames?: {
		trigger?: string
	}
	headlessTrigger?: boolean
	withArrow?: boolean
}

const options = Array.from(memberRolesMap, ([key, value]) => ({
	key,
	value
})).filter((el) => el.key !== MemberRole.OWNER)

export const MemberRoleSelect = ({
	onChange,
	isDisabled,
	classNames,
	headlessTrigger,
	value,
	withArrow
}: IMemberRolesSelectProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selected, setSelected] = useState<Set<MemberRole>>(
		new Set(value ? [value] : [MemberRole.MEMBER])
	)

	const selectedValue = useMemo(
		() => memberRolesMap.get([...selected][0])!,
		[selected]
	)

	const handleSelectionChange = (key: Set<MemberRole>) => {
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
			isDisabled={isDisabled}
			onOpenChange={setIsOpen}
		>
			<DropdownTrigger>
				<Button
					className={cn(
						'min-w-20',
						headlessTrigger &&
							'border-none hover:bg-transparent text-tw-text-350 text-sm p-0 data-[pressed=true]:scale-100 data-[focus-visible=true]:outline-none min-w-0 aria-expanded:opacity-100 aria-expanded:scale-100 gap-1',
						classNames?.trigger
					)}
					variant={'ghost'}
					size="sm"
					disableAnimation={headlessTrigger}
					disableRipple={headlessTrigger}
				>
					<p>{selectedValue}</p>
					{withArrow && (
						<IconChevronDown
							className={cn(
								'transition-transform rotate-0 size-4',
								isOpen && 'rotate-180'
							)}
						/>
					)}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selected}
				onSelectionChange={(key) =>
					handleSelectionChange(key as Set<MemberRole>)
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
