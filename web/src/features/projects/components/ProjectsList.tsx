'use client'

import {
	ProjectsListItem,
	useProjectsFiltersStore,
	useProjectsWithFiltersQuery
} from '@/features/projects'
import { Skeleton } from "@heroui/react"
import Image from 'next/image'

export const ProjectsList = () => {
	const {
		leadersIds,
		network,
		onlyMyProjects,
		searchValue,
		sortBy,
		sortOrder,
		afterDate,
		beforeDate
	} = useProjectsFiltersStore((s) => s)

	const { data: projects, isFetching } = useProjectsWithFiltersQuery({
		searchValue: searchValue === '' ? undefined : searchValue,
		takeMembers: 5,
		afterDate,
		beforeDate,
		leadersIds,
		network,
		onlyMyProjects,
		sortBy,
		sortOrder
	})

	if (!isFetching && !projects?.length) {
		return (
			<div className="w-full h-full grid place-items-center">
				<div className="flex flex-col items-center">
					<Image
						src={'/no-results.png'}
						alt="no-results"
						width={400}
						height={400}
					/>
					<p className="text-lg text-tw-text-200 font-medium text-center">
						No projects found. Try to change your filters or create one
					</p>
				</div>
			</div>
		)
	}

	return (
		<div
			className={'lg:grid-cols-3 sm:grid-cols-2 grid 2xl:grid-cols-4 gap-4 p-4'}
		>
			{isFetching &&
				Array(12)
					.fill(0)
					.map((_, i) => <Skeleton key={i} className="h-[14rem] rounded-md" />)}
			{!isFetching &&
				projects?.map((project) => (
					<ProjectsListItem project={project} key={project.id} />
				))}
		</div>
	)
}
