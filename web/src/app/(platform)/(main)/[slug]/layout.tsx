import { getAllProjectsByWorkspaceSlug } from '@/api'
import { WorkspaceLayout } from '@/components/layout'
import { ProjectsProvider } from '@/features/projects'
import { PropsWithChildren } from 'react'

interface ILayoutProps extends PropsWithChildren {
	params: {
		slug: string
	}
}

const Layout = async ({ children, params }: ILayoutProps) => {
	const { slug } = await params
	const projects = await getAllProjectsByWorkspaceSlug(slug)

	return (
		<ProjectsProvider initialProjects={projects}>
			<WorkspaceLayout>{children}</WorkspaceLayout>
		</ProjectsProvider>
	)
}

export default Layout
