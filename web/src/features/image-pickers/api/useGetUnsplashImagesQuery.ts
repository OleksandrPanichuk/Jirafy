'use client'

import { getRandomPhotos, searchPhotos } from '@/api'
import { useQuery } from '@tanstack/react-query'

interface IGetUnsplashImagesQuery {
	query: string
	count?: number
}

export const useGetUnsplashImagesQuery = ({
	query,
	count
}: IGetUnsplashImagesQuery) => {
	return useQuery({
		queryFn: () => {
			if (query) {
				return searchPhotos(query, count)
			}
			return getRandomPhotos(count)
		},
		queryKey: ['unsplash', query, count]
	})
}
