'use client'

import { memberRolesMap } from '@/constants'
import { Button } from '@/features/shared'
import { cn } from '@/lib'
import { InviteMemberRole, MemberRole } from '@/types'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@heroui/react"
import { useEffect, useMemo, useState } from 'react'

type TypeInviteMemberRole = 'ALL' | `${InviteMemberRole}`

interface IMemberRolesSelectProps {
	value?: TypeInviteMemberRole
	onChange: (value: `${InviteMemberRole}` | undefined) => void
	isDisabled?: boolean
	classNames?: {
		trigger?: string
	}
}

const options = [
	{
		key: 'ALL',
		value: 'All roles'
	}
].concat(
	Array.from(memberRolesMap, ([key, value]) => ({
		key,
		value
	})).filter((el) => el.key !== MemberRole.OWNER)
)

export const InviteMemberRoleSelect = ({
	onChange,
	isDisabled,
	classNames,
	value
}: IMemberRolesSelectProps) => {
	const [selected, setSelected] = useState<Set<TypeInviteMemberRole>>(
		new Set(value ? [value] : ['ALL'])
	)

	const selectedValue = useMemo(
		() => options.find((option) => option.key === [...selected][0])?.value,
		[selected]
	)

	const handleSelectionChange = (key: Set<TypeInviteMemberRole>) => {
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
					handleSelectionChange(key as Set<TypeInviteMemberRole>)
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
