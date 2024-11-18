'use client'

import { DragHandle } from '@/components/ui'
import { Routes } from '@/constants'
import {
	ProjectMenu,
	SidebarGroup,
	SidebarItem,
	useWorkspaceSidebarStore
} from '@/features/sidebars'
import { useCurrentWorkspaceSlug } from '@/hooks'
import { cn } from '@/lib'
import type { TypeProject } from '@/types'
import {
	IconFileText,
	IconInnerShadowRight,
	IconSquares,
	IconStack2
} from '@tabler/icons-react'

interface ISidebarProjectsItemProps {
	data: TypeProject
}

export const SidebarProjectsItem = ({ data }: ISidebarProjectsItemProps) => {
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)
	const slug = useCurrentWorkspaceSlug()

	return (
		<div className="w-full relative">
			<div className="w-full relative">
				<SidebarGroup
					classNames={{
						trigger: cn('mt-0', isCollapsed && '!flex !size-8'),
						titleWrapper: 'min-h-[30px] justify-start gap-1.5',
						title: cn(
							'truncate text-sm font-medium text-tw-text-200 flex-1',
							isCollapsed && 'hidden'
						),
						action: cn(isCollapsed && 'hidden'),
						indicator: cn(isCollapsed && 'hidden')
					}}
					action={<ProjectMenu projectId={data.id} />}
					title={data.name}
					emoji={data.emoji}
					uppercase={false}
					shouldBeOpenWhenCollapsed={false}
				>
					{!isCollapsed && (
						<>
							<SidebarItem
								icon={<IconSquares className="size-4" />}
								href={Routes.PROJECT_ISSUES(slug, data.id)}
								text="Issues"
								classNames={{
									content: 'pl-3'
								}}
							/>
							<SidebarItem
								icon={<IconInnerShadowRight className="size-4" />}
								href={Routes.PROJECT_CYCLES(slug, data.id)}
								text="Cycles"
								classNames={{
									content: 'pl-3'
								}}
							/>
							<SidebarItem
								icon={<IconStack2 className="size-4" />}
								href={Routes.PROJECT_VIEWS(slug, data.id)}
								text="Views"
								classNames={{
									content: 'pl-3'
								}}
							/>
							<SidebarItem
								icon={<IconFileText className="size-4" />}
								href={Routes.PROJECT_PAGES(slug, data.id)}
								text="Pages"
								classNames={{
									content: 'pl-3'
								}}
							/>
						</>
					)}
				</SidebarGroup>
			</div>
		</div>
	)
}

SidebarProjectsItem.DndPreview = function Preview({
	data
}: ISidebarProjectsItemProps) {
	return (
		<div className="relative ">
			<DragHandle className="absolute top-[13.5px] left-[-12px] translate-y-[-50%]" />

			<div
				className={
					'w-full  flex  items-center text-tw-text-400 text-xs font-semibold min-h-[30px] justify-start gap-1.5 bg-zinc-800  rounded   py-0 px-2'
				}
			>
				{data.emoji && <span>{data.emoji}</span>}
				<span
					className={'truncate text-sm font-medium text-tw-text-200 flex-1'}
				>
					{data.name}
				</span>
				<div className={'flex items-center'}>
					<ProjectMenu projectId={data.id} />
				</div>
			</div>
		</div>
	)
}
