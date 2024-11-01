'use client'

import { cn } from '@/lib'
import { Button, Tooltip } from '@nextui-org/react'
import { IconArrowRight, IconHeart } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { UserMenu, WorkspaceSwitcher } from './components'
import { useWorkspaceSidebarStore } from './store'

export const WorkspaceSidebar = () => {
	const [storageIsOpen, setIsOpen] = useLocalStorage('workspace-sidebar', false)
	const { isCollapsed, setIsCollapsed } = useWorkspaceSidebarStore()

	useEffect(() => {
		if (storageIsOpen !== undefined) {
			setIsCollapsed(!storageIsOpen)
		}
	}, [storageIsOpen, setIsCollapsed])

	const toggle = () => setIsOpen(isCollapsed)

	return (
		<aside
			className={cn(
				'border-tw-border-200 border-r bg-tw-bg-100 pt-4',
				!isCollapsed && 'min-w-[240px]'
			)}
		>
			<div className="flex flex-col h-full">
				<div className="px-4 flex gap-2">
					<WorkspaceSwitcher />
					<UserMenu />
				</div>
				<div className="overflow-x-hidden  h-full w-full overflow-y-auto py-0.5 px-4 flex-1"></div>
				<div
					className={cn(
						'border-t border-tw-border-200 px-2 flex items-center gap-1 justify-between',
						!isCollapsed ? 'h-12' : 'flex-col gap-2 py-2'
					)}
				>
					<Tooltip
						hidden={!isCollapsed}
						placement="right"
						content={<span className="text-sm">Update plan</span>}
					>
						<Button
							variant="flat"
							className={cn(
								'text-tw-primary-100 text-sm ',
								!isCollapsed && 'min-w-24 rounded-2xl'
							)}
							size="sm"
							color="primary"
							isIconOnly={isCollapsed}
						>
							<IconHeart />
							{!isCollapsed && 'Upgrade plan'}
						</Button>
					</Tooltip>

					<Tooltip
						placement="right"
						content={
							<span className="text-sm">
								{!isCollapsed ? 'Hide' : 'Expand'}
							</span>
						}
					>
						<Button variant="light" size="sm" onClick={toggle} isIconOnly>
							<IconArrowRight
								className={cn(
									'transition duration-300',
									!isCollapsed ? 'rotate-180' : 'rotate-0'
								)}
							/>
						</Button>
					</Tooltip>
				</div>
			</div>
		</aside>
	)
}
