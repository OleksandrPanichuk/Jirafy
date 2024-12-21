'use client'

import { Button } from '@/components/ui'
import { MembersTableCell, useInfiniteMembersQuery } from '@/features/members'
import {
	MembersTableHeaderKeys,
	memberTableColumns
} from '@/features/members/data'
import { useDebounce } from '@/hooks'
import { MemberType } from '@/types'
import {
	Input,
	Spinner,
	Table,
	TableBody,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { ChangeEvent, useState } from 'react'

interface IMembersTableProps {
	type: MemberType
	identifier: string
}

export const MembersTable = ({ type, identifier }: IMembersTableProps) => {
	const [page, setPage] = useState(1)
	const [searchValue, setSearchValue] = useState('')

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
		searchValue: debouncedSearchValue
	})

	const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const handleNext = () => {
		if (hasNextPage) {
			fetchNextPage()
			setPage((prev) => prev + 1)
		}
	}

	const handlePrev = () => {
		if (hasPreviousPage) {
			fetchPreviousPage()
			setPage((prev) => prev - 1)
		}
	}

	return (
		<div>
			<div>
				<h2>Members</h2>
				<div>
					<Input
						size="sm"
						placeholder="Search..."
						startContent={<IconSearch />}
						onChange={handleSearchValueChange}
					/>
					<Button variant="primary" size="sm">
						Add member
					</Button>
				</div>
			</div>
			<Table
				bottomContent={
					<div>
						<Button
							size="sm"
							variant="ghost"
							onPress={handlePrev}
							isDisabled={isFetching || !hasPreviousPage}
						>
							Prev
						</Button>
						<Button
							size="sm"
							variant="ghost"
							onPress={handleNext}
							isDisabled={isFetching || !hasNextPage}
						>
							Next
						</Button>
					</div>
				}
				removeWrapper
			>
				<TableHeader columns={memberTableColumns}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={members?.pages[page - 1].members ?? []}
					loadingContent={<Spinner />}
					loadingState={isFetching ? 'loading' : 'idle'}
					emptyContent="No members found"
				>
					{(member) => (
						<TableRow>
							{(columnKey) => (
								<MembersTableCell
									key={columnKey.toString() as MembersTableHeaderKeys}
									member={member}
								/>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
