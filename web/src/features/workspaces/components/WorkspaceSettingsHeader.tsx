'use client'

import { WorkspaceSidebarMobile } from '@/features/sidebars'
import { BreadcrumbItem, Breadcrumbs, Tooltip } from "@heroui/react"
import { IconSettings } from '@tabler/icons-react'

export const WorkspaceSettingsHeader = () => {
	return (
		<header
			className={
				'z-20 px-5 flex gap-2 items-center h-[3.75rem] border-b border-tw-border-200 bg-tw-bg-100'
			}
		>
			<WorkspaceSidebarMobile />
			<div className={'w-full '}>
				<Breadcrumbs>
					<BreadcrumbItem startContent={<IconSettings />}>
						<Tooltip content={<span className={'text-sm'}>Personal</span>}>
							Personal
						</Tooltip>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Tooltip content={<span>Settings</span>}>Settings</Tooltip>
					</BreadcrumbItem>
				</Breadcrumbs>
			</div>
		</header>
	)
}
