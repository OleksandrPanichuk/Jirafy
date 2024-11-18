'use client'

import { FavoritesApi } from '@/api'
import { useMutation } from '@/hooks'
import { useFavoritesStore } from '../providers'

export const useAddToFavoritesMutation = () => {
	const add = useFavoritesStore((s) => s.add)
	return useMutation({
		mutationFn: FavoritesApi.add,
		onSuccess: ({ data }) => add(data)	
	})
}
