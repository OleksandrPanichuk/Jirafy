import { FindAllMembersInput, MembersApi } from '@/api'
import { useInfiniteQueryRef } from '@/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInfiniteMembersQuery = (
	dto: Omit<FindAllMembersInput, 'cursor'>
) => {
	const state = useInfiniteQuery({
		queryFn: ({ pageParam }) =>
			MembersApi.findAll({ ...dto, cursor: pageParam || undefined }),
		queryKey: ['members', 'all', dto],
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		initialPageParam: ''
	})

	const { fetchNextPage, hasNextPage, isFetching, isLoading } = state

	const ref = useInfiniteQueryRef({
		fetchNextPage,
		hasNextPage,
		isFetching,
		isLoading
	})

	return { ...state, ref }
}
