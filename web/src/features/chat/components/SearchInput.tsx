'use client'

import { useChannelsStore } from '@/features/chat'
import { Input } from '@heroui/react'

export const SearchInput = () => {
	const searchValue = useChannelsStore((s) => s.searchValue)
	const setSearchValue = useChannelsStore((s) => s.setSearchValue)
	return (
		<Input
			placeholder="Search channels..."
			size="sm"
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
		/>
	)
}
