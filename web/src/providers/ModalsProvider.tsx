'use client'

import { CreateProjectModal } from '@/features/projects'
import { useMounted } from '@/hooks'

export const ModalsProvider = () => {
	const isMounted = useMounted()

	if (!isMounted) return null

	return (
		<>
			<CreateProjectModal />
		</>
	)
}
