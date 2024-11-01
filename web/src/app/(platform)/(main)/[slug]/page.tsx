'use client'

import { useWorkspacesStore } from '@/features/workspaces'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useEffect } from 'react'

interface IParams {
	[key: string]: string
	slug: string
}

const Page = () => {
	const params = useParams<IParams>()
	
	const getWorkspace = useWorkspacesStore((s) => s.getWorkspaceBySlug)
	const getCurrentWorkspace = useWorkspacesStore((s) => s.getCurrentWorkspace)
	const selectWorkspace = useWorkspacesStore((s) => s.selectWorkspace)

	useEffect(() => {
		if (getCurrentWorkspace()?.slug !== params.slug) {
			selectWorkspace(params.slug)
		}
	}, [selectWorkspace, getCurrentWorkspace, params.slug])

	if (!getWorkspace(params.slug)) {
		return notFound()
	}

	return (
		<div className="relative flex h-full w-full overflow-hidden">
			<Link href="/create-workspace">Link</Link>
		</div>
	)
}

export default Page
