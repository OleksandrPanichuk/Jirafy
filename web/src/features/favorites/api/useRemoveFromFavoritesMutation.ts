'use client'

import { FavoritesApi } from '@/api'
import { useMutation } from '@/hooks'
import { useFavoritesStore } from '../providers'

export const useRemoveFromFavoritesMutation = () => {
	const remove = useFavoritesStore((s) => s.remove)
	return useMutation({
		mutationFn: FavoritesApi.remove,
		onSuccess: (_, { favoriteId }) => remove(favoriteId)
	})
}
