'use client'

import { useInfiniteMembersQuery } from '@/features/members'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/features/shared'
import { useDebounce } from '@/hooks'
import { MemberRole, MemberType } from '@/types'
import { Input, Spinner } from '@heroui/react'
import { IconSearch } from '@tabler/icons-react'
import {
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table'
import { ChangeEvent, useMemo, useState } from 'react'

import { checkMemberPermissions } from '@/lib'
import { columns } from './MembersTable.columns'
import { InvitationModal } from '@/features/invites'

interface IMembersTableProps {
	type: MemberType
	identifier: string
	currentMemberRole: MemberRole
}

export const MembersTable = ({
	type,
	identifier,
	currentMemberRole
}: IMembersTableProps) => {
	const [searchValue, setSearchValue] = useState('')
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false)

	const debouncedSearchValue = useDebounce(searchValue)

	const {
		data: members,
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		hasPreviousPage,
		isFetching
	} = useInfiniteMembersQuery({
		type,
		identifier,
		take: 20,
		searchValue: debouncedSearchValue,
		withUser: true
	})

	const tableData = useMemo(
		() => members?.pages.map((el) => el.members).flat() ?? [],
		[members]
	)

	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel()
	})

	const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const handleNext = () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	}

	const handlePrev = () => {
		if (hasPreviousPage) {
			fetchPreviousPage()
		}
	}

	return (
		<div className={'overflow-hidden'}>
			<InvitationModal
				onOpenChange={setIsInvitationModalOpen}
				isOpen={isInvitationModalOpen}
			/>
			<div className={'flex w-full gap-2 items-center'}>
				<h2 className="flex-1 hidden sm:block">Members</h2>

				<Input
					size="sm"
					placeholder="Search..."
					className="max-w-[20rem]"
					startContent={<IconSearch />}
					onChange={handleSearchValueChange}
				/>
				<div className="flex-1 sm:flex-none sm:hidden" />
				{checkMemberPermissions(currentMemberRole) &&
					type === MemberType.WORKSPACE && (
						<Button
							variant="primary"
							size="sm"
							className={'px-5'}
							onPress={() => setIsInvitationModalOpen(true)}
						>
							Add member
						</Button>
					)}
			</div>
			{/* TODO: separate into custom component */}
			<div className="rounded-md border border-tw-border-300 mt-4">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead className="w-max" key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{!isFetching ? (
							table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										className={'border-tw-border-300 '}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell className="[&>*]:w-max" key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24">
									<Spinner size="lg" className="mx-auto flex" />
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex w-full justify-end gap-2 mt-4">
				<Button
					onPress={handlePrev}
					isDisabled={!hasPreviousPage}
					variant={'ghost'}
					size={'sm'}
				>
					Prev
				</Button>
				<Button
					onPress={handleNext}
					isDisabled={!hasNextPage}
					variant={'ghost'}
					size={'sm'}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
