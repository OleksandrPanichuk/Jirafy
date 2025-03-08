'use client'

import {
	ProjectsFilters,
	useCreateProjectModalStore
} from '@/features/projects'
import { Button } from '@/features/shared'
import { IconBriefcase } from '@tabler/icons-react'

export const ProjectsPageHeader = () => {
	const openCreateProjectModal = useCreateProjectModalStore((s) => s.open)
	return (
		<header
			className={
				'  md:px-[1.35rem] px-5  flex gap-2 w-full items-center border-b border-tw-border-200 bg-tw-bg-100'
			}
		>
			<div className="flex w-full justify-between items-center gap-2 h-[3.75rem]">
				<div className="flex cursor-default items-center gap-1 text-sm font-medium text-tw-text-100">
					<IconBriefcase className="size-5" />
					Projects
				</div>
				<div className="flex items-center gap-2">
					<ProjectsFilters />
					<Button
						onPress={openCreateProjectModal}
						className={'px-3 py-1.5 h-7 text-xs'}
						size="sm"
					>
						Add project
					</Button>
				</div>
			</div>
		</header>
	)
}
