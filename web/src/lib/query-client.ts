import { isServer, QueryClient } from '@tanstack/react-query'

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 60 * 1000
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
	if (isServer) {
		return makeQueryClient()
	}

	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}
