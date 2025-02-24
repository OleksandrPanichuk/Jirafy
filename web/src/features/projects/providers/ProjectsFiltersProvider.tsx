'use client'

import type { ProjectFilters } from '@/features/projects'
import { useSafeContext } from '@/hooks'
import { useGetCookie } from 'cookies-next'
import { createContext, PropsWithChildren, useMemo, useState } from 'react'

interface IProjectsFiltersContext {
	filters: ProjectFilters
	setFilters: (value: ProjectFilters) => void
}

export const ProjectsFiltersContext = createContext<IProjectsFiltersContext>(
	{} as IProjectsFiltersContext
)

export const ProjectsFiltersProvider = ({ children }: PropsWithChildren) => {
	const getCookie = useGetCookie()
	const filtersString = useMemo(
		() => getCookie('projects-filters'),
		[getCookie]
	)
	const [filters, setFilters] = useState<ProjectFilters>(
		filtersString ? JSON.parse(filtersString) : {}
	)

	return (
		<ProjectsFiltersContext.Provider value={{ filters, setFilters }}>
			{children}
		</ProjectsFiltersContext.Provider>
	)
}

export const useProjectsFiltersContext = () => {
	return useSafeContext(ProjectsFiltersContext)
}
