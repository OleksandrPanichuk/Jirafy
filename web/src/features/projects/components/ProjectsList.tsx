'use client'

import {
	ProjectsListItem,
	useProjectsFiltersContext,
	useProjectsWithFiltersQuery
} from '@/features/projects'

export const ProjectsList = () => {
	const { filters } = useProjectsFiltersContext()

	const { data: projects, isFetching } = useProjectsWithFiltersQuery({
		...filters,
		takeMembers: 5
	})
	return (
		<div
			className={'lg:grid-cols-3 sm:grid-cols-2 grid 2xl:grid-cols-4 gap-4 p-4'}
		>
			{isFetching && <div className={'animate-pulse'}></div>}
			{!isFetching &&
				projects?.map((project) => (
					<ProjectsListItem project={project} key={project.id} />
				))}
		</div>
	)
}
