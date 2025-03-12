'use client'

import { breakpoints } from '@/constants'
import { useProjectsFiltersStore } from '@/features/projects'
import { AccessSelect } from '@/features/projects/components/ProjectsFilters/AccessSelect'
import { Button, Input } from '@/features/shared'
import { useDisclosure, useMediaQuery } from '@/hooks'
import { cn } from '@/lib'
import {
	Accordion,
	AccordionItem,
	Checkbox,
	Divider,
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@heroui/react"
import { IconChevronDown, IconFilter } from '@tabler/icons-react'
import { useState } from 'react'
import { CreateDateSelect } from './CreateDateSelect'

export const FiltersSelect = () => {
	const { isOpen, setIsOpen } = useDisclosure()
	const [isMobile] = useMediaQuery(breakpoints['max-md'])
	const onlyMyProjects = useProjectsFiltersStore((s) => s.onlyMyProjects)
	const toggleOnlyMyProjects = useProjectsFiltersStore(
		(s) => s.toggleOnlyMyProjects
	)

	const [searchValue, setSearchValue] = useState('')

	return (
		<Popover isOpen={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger>
				<Button
					startContent={<IconFilter className={'size-3'} />}
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
					{!isMobile && 'Filters'}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={
					'my-1 overflow-y-auto rounded-md border-[0.5px] border-tw-border-300 bg-tw-bg-100 px-2 py-2.5 text-xs focus:outline-none min-w-[300px] whitespace-nowrap max-h-[75vh] '
				}
			>
				<form className={'w-full'}>
					<Input
						classNames={{
							container: 'h-7 rounded'
						}}
						placeholder={'Search'}
						className={'text-xs'}
						size={'sm'}
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</form>

				<Checkbox
					classNames={{
						base: 'flex w-full items-center rounded p-1.5 hover:bg-tw-bg-80 w-full max-w-none my-2',
						label: 'flex-grow truncate text-xs text-tw-text-200'
					}}
					size={'sm'}
					isSelected={onlyMyProjects}
					onValueChange={toggleOnlyMyProjects}
				>
					My Projects
				</Checkbox>
				<Divider className={'my-2'} />
				<Accordion
					defaultExpandedKeys={['access', 'created-date']}
					className={' px-0'}
					dividerProps={{
						className: 'my-2'
					}}
					selectionMode="multiple"
					isCompact
					disableAnimation
				>
					<AccordionItem
						classNames={{
							title: 'text-xs text-tw-text-200',
							trigger: 'p-0'
						}}
						className="pl-1.5"
						title={'Access'}
						key={'access'}
					>
						<AccessSelect />
					</AccordionItem>
					<AccordionItem
						classNames={{
							title: 'text-xs text-tw-text-200',
							trigger: 'p-0'
						}}
						className="pl-1.5"
						title={'Created date'}
						key={'created-date'}
					>
						<CreateDateSelect searchValue={searchValue} />
					</AccordionItem>
				</Accordion>
			</PopoverContent>
		</Popover>
	)
}
