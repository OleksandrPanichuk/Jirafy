'use client'

import { useAuth } from '@/features/auth'
import { useInfiniteMembersQuery } from '@/features/members'
import { useDebounce } from '@/hooks'
import { TypeMemberWithUser } from '@/types'
import {
	Avatar,
	Button,
	Input,
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Skeleton,
	User
} from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'

const DEFAULT_TAKE = 20

interface IProjectLeadSelectProps extends ControllerRenderProps {}

export const ProjectLeadSelect = ({
	onChange,
	value
}: IProjectLeadSelectProps) => {
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

	const [selectedValue, setSelectedValue] =
		useState<TypeMemberWithUser['user']>()

	const handleSelectionChange = (key: Set<string>) => {
		const keyId = [...key][0]

		const selectedMember =
			user!.id === keyId
				? user
				: members?.find((member) => member.user.id === keyId)?.user

		if (selectedMember) {
			setSelectedKeys(key)
			setSelectedValue(selectedMember)
			onChange(selectedMember.id)
		}
	}

	useEffect(() => {
		if (value && !selectedValue) {
			const selectedMember =
				user!.id === value
					? user
					: members?.find((member) => member.user.id === value)?.user

			if (selectedMember) {
				setSelectedValue(selectedMember)
				setSelectedKeys(new Set([selectedMember.id]))
			}
		}
	}, [members, value, selectedValue, user])

	return (
		<Popover
			classNames={{
				content: 'rounded-md border border-tw-border-400 bg-tw-bg-100'
			}}
		>
			<PopoverTrigger>
				<Button
					className="w-min rounded-md bg-tw-bg-100 border-tw-border-300 border-[0.5px] px-2 py-0.5 hover:bg-tw-border-300"
					variant="bordered"
					size="sm"
				>
					{selectedValue && (
						<Avatar
							size="sm"
							src={selectedValue?.avatar?.url}
							className="!size-6"
						/>
					)}
					Lead
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-2">
				<div className="mb-2">
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
						className="max-h-[200px] overflow-y-auto p-0"
						disallowEmptySelection
						disabledKeys={['next']}
						selectionMode="single"
						selectedKeys={selectedKeys}
						onSelectionChange={(key) =>
							handleSelectionChange(key as Set<string>)
						}
					>
						<>
							{user && (
								<ListboxItem
									className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
									variant="flat"
									key={user!.id}
								>
									<User
										name={user!.username}
										className="flex items-center justify-start"
										avatarProps={{
											src: user!.avatar?.url,
											className: '!size-6'
										}}
									/>
								</ListboxItem>
							)}
						</>

						<>
							{members?.length ? (
								<>
									{members?.map((member) => (
										<ListboxItem
											className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
											variant="flat"
											key={member.user.id}
										>
											<User
												name={member.user.username}
												className="flex items-center justify-start"
												avatarProps={{
													src: member.user.avatar?.url,
													className: '!size-6'
												}}
											/>
										</ListboxItem>
									))}
								</>
							) : (
								isFetching && (
									<>
										{Array.from({ length: 4 }).map((_, i) => (
											<ListboxItem
												variant="solid"
												className="relative h-9 mt-2"
												key={i}
												isDisabled
											>
												<Skeleton className="w-full rounded-md absolute top-0 left-0">
													<div className="h-9 w-full rounded-md bg-tw-bg-80" />
												</Skeleton>
											</ListboxItem>
										))}
									</>
								)
							)}
						</>

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
