'use client'

import { Routes } from '@/constants'
import { useCurrentWorkspaceSlug } from '@/hooks'
import { absoluteUrl } from '@/lib'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { IconDots, IconLink, IconSettings, IconStar } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useCopyToClipboard } from 'react-use'

interface IProjectMenuProps {
	projectId: string
}

// TODO: favorites functionality
export const ProjectMenu = ({ projectId }: IProjectMenuProps) => {
	const router = useRouter()
	const slug = useCurrentWorkspaceSlug()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()

	const handleLinkCopy = () => {
		copy(absoluteUrl(Routes.PROJECT_ISSUES(slug, projectId)))
	}

	const handleSettings = () => {
		router.push(Routes.PROJECT_SETTINGS(slug, projectId))
	}

	return (
		<Dropdown
			placement="bottom-end"
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
					variant="flat"
					className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
					startContent={<IconStar className="size-4 text-tw-text-200" />}
				>
					Add to favorites
				</DropdownItem>
				<DropdownItem
					variant="flat"
					className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
					startContent={<IconLink className="size-4 text-tw-text-200" />}
					onPress={handleLinkCopy}
				>
					Copy link
				</DropdownItem>
				<DropdownItem
					variant="flat"
					className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
					startContent={<IconSettings className="size-4 text-tw-text-200" />}
					onPress={handleSettings}
					href={Routes.PROJECT_ISSUES(slug, projectId)}
				>
					Settings
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
