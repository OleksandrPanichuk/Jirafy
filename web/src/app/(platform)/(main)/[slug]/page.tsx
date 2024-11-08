'use client'

import { useCurrentWorkspace, useWorkspacesStore } from '@/features/workspaces'
import { notFound, useParams } from 'next/navigation'
import { useEffect } from 'react'

interface IParams {
	[key: string]: string
	slug: string
}

const Page = () => {
	const params = useParams<IParams>()

	const getWorkspace = useWorkspacesStore((s) => s.getWorkspaceBySlug)
	const currentWorkspace = useCurrentWorkspace()
	const selectWorkspace = useWorkspacesStore((s) => s.selectWorkspace)

	useEffect(() => {
		if (currentWorkspace?.slug !== params.slug) {
			selectWorkspace(params.slug)
		}
	}, [selectWorkspace, currentWorkspace.slug, params.slug])

	if (!getWorkspace(params.slug)) {
		return notFound()
	}

	return <div></div>
}

export default Page
