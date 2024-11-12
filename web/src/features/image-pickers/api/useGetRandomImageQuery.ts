'use client'

import { getRandomPhotos } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useId } from 'react'

export const useGetRandomImageQuery = () => {
	const id = useId()
	return useQuery({
		queryKey: ['random-image', id],
		queryFn: () => getRandomPhotos(1),
		select: (data) => data?.[0]
	})
}
