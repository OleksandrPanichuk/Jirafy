'use client'

import { getRandomPhotos } from '@/api'
import { useEffect, useState } from 'react'
import { Random } from 'unsplash-js/dist/methods/photos/types'

interface IGetUnsplashImagesQuery {
	query: string
	count?: number
}

export const useGetUnsplashImagesQuery = ({
	query,
	count
}: IGetUnsplashImagesQuery) => {
	const [data, setData] = useState<Random[] | undefined>()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		async function fetchPhotos() {
			try {
				setIsLoading(true)

				const photos = await getRandomPhotos({
					query,
					count
				})
				setData(photos)
			} finally {
				setIsLoading(false)
			}
		}
		fetchPhotos()
	}, [count, query])

	return { data, isLoading }
}
