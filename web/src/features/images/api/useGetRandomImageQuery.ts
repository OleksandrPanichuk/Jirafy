'use client'

import { getRandomPhotos } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useId } from 'react'

type Props = {
	onSuccess?: (url: string) => void
}

export const useGetRandomImageQuery = ({onSuccess}:Props = {}) => {
	const id = useId()
	return useQuery({
		queryKey: ['random-image', id],
		queryFn: async () => {
			const data = await getRandomPhotos({
				count:1
			})
			if(!data) throw new Error('No data')
			
			onSuccess?.(data[0].urls.full)

			return data
		},
		select: (data) => data?.[0],
	})
}
