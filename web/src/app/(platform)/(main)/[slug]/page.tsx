'use client'

import { useWorkspacesStore } from '@/features/workspaces'
import Link from 'next/link'

const Page = () => {
	const workspaces = useWorkspacesStore((s) => s.workspaces)
	return (
		<div>
			<Link href="/create-workspace">Link</Link>
			<pre>{JSON.stringify(workspaces)}</pre>
		</div>
	)
}

export default Page
