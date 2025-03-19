'use client'

import { Routes } from '@/constants'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { IconHome, IconMessage, IconSettings } from '@tabler/icons-react'

import { SidebarItem, UserMenu, WorkspaceSwitcher } from '@/features/sidebars'

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
			<UserMenu />
		</aside>
	)
}
//
// ChatSidebar.Content = function ContentSidebar({ children }: PropsWithChildren) {
// 	const [value, setValue] = useState('')
// 	return (
// 		<div className=" w-full h-full  border-r border-tw-border-300 md:flex hidden p-4 flex-col gap-4">
// 			<SearchInput value={value} onChange={setValue} />
// 			{children}
// 		</div>
// 	)
// }
