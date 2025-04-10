import {
	getAllFavoritesByWorkspaceSlug,
	getAllProjectsByWorkspaceSlug
} from '@/api'
import { FavoritesProvider } from '@/features/favorites'
import { CreateProjectModal, ProjectsProvider } from '@/features/projects'
import { WorkspaceLayout } from '@/features/workspaces'
import { PropsWithChildren } from 'react'

interface ILayoutProps extends PropsWithChildren {
	params: Promise<{
		slug: string
	}>
}

const Layout = async ({ children, params }: ILayoutProps) => {
	const { slug } = await params

	const [projects, favorites] = await Promise.all([
		getAllProjectsByWorkspaceSlug(slug),
		getAllFavoritesByWorkspaceSlug(slug)
	])

	return (
		<ProjectsProvider initialProjects={projects}>
			<FavoritesProvider initialData={favorites}>
				<WorkspaceLayout>
					{/*TODO: do something with this modal, it shouldn't be here*/}
					<CreateProjectModal />
					{children}
				</WorkspaceLayout>
			</FavoritesProvider>
		</ProjectsProvider>
	)
}

export default Layout
