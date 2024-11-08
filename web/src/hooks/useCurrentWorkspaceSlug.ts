import { useParams } from 'next/navigation'

export const useCurrentWorkspaceSlug = () => {
	const params = useParams()
	return params.slug as string
}
