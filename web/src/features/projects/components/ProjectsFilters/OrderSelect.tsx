'use client'

import { breakpoints } from '@/constants'
import {
	TypeProjectsFilters,
	useProjectsFiltersStore
} from '@/features/projects'
import { Button } from '@/features/shared'
import { useDisclosure, useMediaQuery } from '@/hooks'
import { cn } from '@/lib'
import {
	Divider,
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@heroui/react"
import { IconChevronDown, IconSortDescending } from '@tabler/icons-react'

export const OrderSelect = () => {
	const { isOpen, setIsOpen } = useDisclosure()

	const [isMobile] = useMediaQuery(breakpoints['max-md'])

	const sortBy = useProjectsFiltersStore((s) => s.sortBy)
	const sortOrder = useProjectsFiltersStore((s) => s.sortOrder)
	const setSortBy = useProjectsFiltersStore((s) => s.setSortBy)
	const setSortOrder = useProjectsFiltersStore((s) => s.setSortOrder)

	return (
		<Popover isOpen={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger>
				<Button
					startContent={<IconSortDescending className={'size-3'} />}
					endContent={
						!isMobile && (
							<IconChevronDown
								className={cn('transition-all size-3', isOpen && 'rotate-180')}
							/>
						)
					}
					className={'px-2 text-tw-text-200 text-xs gap-1 h-7'}
					variant={'ghost'}
					size={'sm'}
					isIconOnly={isMobile}
				>
					{!isMobile && 'Order by'}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={
					'my-1 overflow-y-auto rounded-md border-[0.5px] border-tw-border-300 bg-tw-bg-100 px-2 py-2.5 text-xs  focus:outline-none min-w-[12rem] whitespace-nowrap max-h-48'
				}
			>
				<Listbox
					variant={'flat'}
					aria-label="SortBy selection"
					className={'p-0'}
					selectionMode="single"
					onSelectionChange={(selected) =>
						setSortBy(Array.from(selected)[0] as TypeProjectsFilters['sortBy'])
					}
					selectedKeys={new Set([sortBy]) as Set<string>}
					disallowEmptySelection
				>
					<ListboxItem
						className={'rounded text-tw-text-200 '}
						key={'name'}
						classNames={{
							title: 'text-xs truncate'
						}}
					>
						Name
					</ListboxItem>
					<ListboxItem
						className={'rounded text-tw-text-200'}
						key={'createdAt'}
						classNames={{
							title: 'text-xs truncate'
						}}
					>
						Created At
					</ListboxItem>
					<ListboxItem
						key={'membersCount'}
						className={'rounded  text-tw-text-200 '}
						classNames={{
							title: 'text-xs truncate'
						}}
					>
						Number of members
					</ListboxItem>
				</Listbox>
				<Divider className={'my-2'} />
				<Listbox
					variant={'flat'}
					aria-label="SortOrder selection"
					className={'p-0'}
					selectionMode="single"
					onSelectionChange={(selected) =>
						setSortOrder(
							Array.from(selected)[0] as TypeProjectsFilters['sortOrder']
						)
					}
					selectedKeys={new Set([sortOrder]) as Set<string>}
					disallowEmptySelection
				>
					<ListboxItem
						key={'asc'}
						className={'rounded  text-tw-text-200 '}
						classNames={{
							title: 'text-xs truncate'
						}}
					>
						Ascending
					</ListboxItem>
					<ListboxItem
						key={'desc'}
						className={'rounded  text-tw-text-200 '}
						classNames={{
							title: 'text-xs truncate'
						}}
					>
						Descending
					</ListboxItem>
				</Listbox>
			</PopoverContent>
		</Popover>
	)
}
