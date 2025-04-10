'use client'

import { Routes } from '@/constants'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import {
	IconArrowLeft,
	IconHome,
	IconMessage,
	IconSettings
} from '@tabler/icons-react'

import { SidebarItem, UserMenu, WorkspaceSwitcher } from '@/features/sidebars'
import { Button } from '@/features/shared'
import { Tooltip } from '@heroui/react'
import Link from 'next/link'

export function ChatSidebarDesktop() {
	const slug = useCurrentWorkspaceSlug()

	return (
		<aside
			className={
				'w-[60px] h-full bg-tw-bg-100 flex-col gap-y-4 items-center  p-4 md:flex hidden'
			}
		>
			<WorkspaceSwitcher variant="compact" />
			<div className="flex flex-col gap-y-2 mt-4 flex-1">
				<SidebarItem
					variant="compact"
					href={Routes.WORKSPACE_CHANNELS(slug)}
					text="Home"
					icon={<IconHome className="size-4" />}
					activeVariant="contains"
				/>
				<SidebarItem
					variant="compact"
					href={Routes.WORKSPACE_CONVERSATIONS(slug)}
					text="Conversations"
					icon={<IconMessage className="size-4" />}
					activeVariant="contains"
				/>
				<SidebarItem
					variant="compact"
					href={Routes.CHAT_SETTINGS(slug)}
					text="Settings"
					icon={<IconSettings className="size-4" />}
				/>
			</div>
			<Tooltip
				placement={'right'}
				size={'sm'}
				content={<span>Back to main menu</span>}
			>
				<Button
					variant={'light'}
					size={'sm'}
					as={Link}
					href={Routes.ROOT}
					isIconOnly
				>
					<IconArrowLeft className={'size-4 text-tw-text-200'} />
				</Button>
			</Tooltip>
			<UserMenu />
		</aside>
	)
}
