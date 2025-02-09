'use client'

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui'
import {
	InviteMemberRoleSelect,
	InvitesStatusSelect,
	useWorkspaceInvitesQuery,
	useWorkspaceInvitesStore
} from '@/features/invites'
import { useCurrentWorkspace } from '@/features/workspaces'
import { InviteMemberRole, InviteState } from '@/types'
import { Input, Spinner } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import { columns } from './WorkspaceInvitesTable.columns'

export const WorkspaceInvitesTable = () => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const currentWorkspace = useCurrentWorkspace()

	const { isLoading } = useWorkspaceInvitesQuery({
		workspaceId: currentWorkspace?.id
	})

	const data = useWorkspaceInvitesStore((s) => s.invites).reverse()

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		state: {
			columnFilters
		},
		initialState: {
			pagination: {
				pageSize: 6
			}
		}
	})
	return (
		<div>
			<div className="flex items-center gap-2">
				<h2 className="flex-1">Invites</h2>
				<Input
					size="sm"
					placeholder="Search by name"
					startContent={<IconSearch />}
					value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('email')?.setFilterValue(event.target.value)
					}
					className="max-w-[20rem]"
				/>
				<InvitesStatusSelect
					value={table.getColumn('state')?.getFilterValue() as InviteState}
					onChange={(value) => table.getColumn('state')?.setFilterValue(value)}
				/>
				<InviteMemberRoleSelect
					value={table.getColumn('role')?.getFilterValue() as InviteMemberRole}
					onChange={(value) => table.getColumn('role')?.setFilterValue(value)}
				/>
			</div>
			<div className="rounded-md border border-tw-border-300 mt-4">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
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
						{!isLoading ? (
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
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => table.previousPage()}
					isDisabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => table.nextPage()}
					isDisabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
