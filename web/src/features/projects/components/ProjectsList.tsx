'use client'

import {
	ProjectsListItem,
	useProjectsFiltersStore,
	useProjectsWithFiltersQuery
} from '@/features/projects'

export const ProjectsList = () => {
	const {
		leadersIds,
		network,
		onlyMyProjects,
		searchValue,
		sortBy,
		sortOrder
	} = useProjectsFiltersStore((s) => s)

	const { data: projects, isFetching } = useProjectsWithFiltersQuery({
		searchValue: searchValue === '' ? undefined : searchValue,
		takeMembers: 5,
		leadersIds,
		network,
		onlyMyProjects,
		sortBy,
		sortOrder
	})

	return (
		<div
			className={'lg:grid-cols-3 sm:grid-cols-2 grid 2xl:grid-cols-4 gap-4 p-4'}
		>
			{/* TODO: add loading state */}
			{isFetching && <div className={'animate-pulse'}></div>}
			{!isFetching &&
				projects?.map((project) => (
					<ProjectsListItem project={project} key={project.id} />
				))}
		</div>
	)
}
