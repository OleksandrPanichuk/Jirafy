'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'
import { getQueryClient } from '@/lib/query-client'

export const QueryProvider = ({ children }: PropsWithChildren) => {
	const queryClient = getQueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools /> */}
			{children}
		</QueryClientProvider>
	)
}
