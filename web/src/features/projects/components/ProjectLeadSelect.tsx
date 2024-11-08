'use client'

import { useAuth } from '@/features/auth'
import { useInfiniteMembersQuery } from '@/features/projects'
import { useCurrentWorkspaceSlug, useDebounce } from '@/hooks'
import {
	Avatar,
	Button,
	Input,
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Skeleton
} from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { useMemo, useState } from 'react'

const DEFAULT_TAKE = 20

export const ProjectLeadSelect = () => {
	const [searchValue, setSearchValue] = useState('')
	const debouncedSearchValue = useDebounce(searchValue)

	const user = useAuth((s) => s.user)
	const slug = useCurrentWorkspaceSlug()
	const [selectedKeys, setSelectedKeys] = useState(new Set(['']))

	const { data, isFetching, hasNextPage, ref } = useInfiniteMembersQuery({
		slug,
		searchValue: debouncedSearchValue,
		take: DEFAULT_TAKE
	})

	const members = data?.pages.flatMap((page) => page.members)

	const selectedValue = useMemo(
		() =>
			members?.find((member) => member.user.id === Array.from(selectedKeys)[0]),
		[selectedKeys, members]
	)

	return (
		<Popover>
			<PopoverTrigger>
				<Button variant="light" size="sm">
					{selectedValue && (
						<Avatar
							size="sm"
							src={selectedValue.user.avatar?.url}
							className="size-4"
						/>
					)}
					Lead
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div>
					<Input
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search"
						startContent={<IconSearch className="size-4" />}
						size="sm"
					/>
				</div>
				<div className="w-full">
					<Listbox
						aria-label="Single selection example"
						className="max-h-[200px] overflow-y-auto"
						disallowEmptySelection
						disabledKeys={['next']}
						selectionMode="single"
						selectedKeys={selectedKeys}
						onSelectionChange={(key) => setSelectedKeys(key as Set<string>)}
					>
						{user ? (
							<ListboxItem variant="flat" key={user.id}>
								{user.username}
							</ListboxItem>
						) : (
							<></>
						)}
						{members ? (
							<>
								{members
									.filter((m) => m.userId !== user?.id)
									.map((member) => (
										<ListboxItem variant="flat" key={member.user.id}>
											{member.user.username}
										</ListboxItem>
									))}
							</>
						) : !isFetching ? (
							<>
								{Array.from({ length: 4 }).map((_, i) => (
									<ListboxItem
										variant="solid"
										className="relative h-8 mt-2"
										key={i}
										isDisabled
									>
										<Skeleton className="w-full rounded-md absolute top-0 left-0">
											<div className="h-8 w-full rounded-md bg-default-200" />
										</Skeleton>
									</ListboxItem>
								))}
							</>
						) : (
							<></>
						)}
						<>
							{hasNextPage && (
								<ListboxItem key={'next'}>
									<div ref={ref} />
								</ListboxItem>
							)}
						</>
					</Listbox>
				</div>
			</PopoverContent>
		</Popover>
	)
}
