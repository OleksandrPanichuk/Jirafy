import { getAllProjectsWithFiltersByWorkspaceSlug } from '@/api'
import {
	ProjectsFiltersProvider,
	ProjectsList,
	ProjectsPageHeader
} from '@/features/projects'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'

interface IProjectsPageProps {
	params: Promise<{
		slug: string
	}>
}

const ProjectsPage = async ({ params }: IProjectsPageProps) => {
	const { slug } = await params

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['projects', 'with-filters', {
			slug,
			takeMembers: 5
		}],
		queryFn: () => getAllProjectsWithFiltersByWorkspaceSlug(slug)
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProjectsFiltersProvider>
				<div className={'flex flex-col w-full overflow-hidden'}>
					<ProjectsPageHeader />
					<div className={'mt-4 overflow-auto'}>
						<ProjectsList />
					</div>
				</div>
			</ProjectsFiltersProvider>
		</HydrationBoundary>
	)
}

export default ProjectsPage
