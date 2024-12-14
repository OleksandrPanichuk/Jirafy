'use client'
import { Routes } from '@/constants'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { IconDots, IconSettings } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

export const WorkspaceActions = () => {
	const workspaceSlug = useCurrentWorkspaceSlug()
	const router = useRouter()

	const handleSettings = () => {
		router.push(Routes.WORKSPACE_SETTINGS(workspaceSlug))
	}

	return (
		<Dropdown
			classNames={{
				content: 'rounded-md border border-tw-border-400 bg-tw-bg-100'
			}}
		>
			<DropdownTrigger>
				<Button
					variant="light"
					size="sm"
					className="!size-6 !min-w-0 text-inherit"
					as="div"
					isIconOnly
				>
					<IconDots className="size-4" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownItem
					className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
					variant="flat"
					onClick={handleSettings}
					href={Routes.WORKSPACE_SETTINGS(workspaceSlug)}
					startContent={<IconSettings className="size-4 text-tw-text-200" />}
				>
					Settings
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
