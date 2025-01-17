'use client'

import { Button } from '@/components/ui'
import { memberRolesMap } from '@/constants'
import { MemberRole } from '@/types'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'

interface IMemberRolesSelectProps {
	value: MemberRole
	onChange: (value: MemberRole) => void
	isDisabled?: boolean
}

export const MemberRoleSelect = ({
	onChange,
	isDisabled,
	value
}: IMemberRolesSelectProps) => {
	const [selected, setSelected] = useState<Set<MemberRole>>(
		new Set([MemberRole.MEMBER])
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

	const options = Array.from(memberRolesMap, ([key, value]) => ({
		key,
		value
	})).filter((el) => el.key !== MemberRole.OWNER)

	return (
		<Dropdown
			classNames={{
				content: 'rounded-md border border-tw-border-400 bg-tw-bg-100 ',
				base: 'mr-2'
			}}
			isDisabled={isDisabled}
		>
			<DropdownTrigger>
				<Button className='min-w-20' variant={'ghost'} size="sm">
					<p>{selectedValue}</p>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Network selection"
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
