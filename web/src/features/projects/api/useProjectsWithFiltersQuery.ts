'use client'

import { ProjectsApi } from '@/api'
import { TypeProjectsFilters } from '@/features/projects'
import { useQuery } from '@/hooks'
import { useParams } from 'next/navigation'

export const useProjectsWithFiltersQuery = (
	variables: TypeProjectsFilters = {}
) => {
	const { slug } = useParams<{ slug: string }>()
	return useQuery({
		queryKey: ['projects', 'with-filters', { slug, ...variables }],
		queryFn: () =>
			ProjectsApi.findAllByWorkspaceSlugWithFilters({ slug, ...variables })
	})
}
