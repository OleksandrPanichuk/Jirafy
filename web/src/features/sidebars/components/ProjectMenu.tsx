'use client'

import { Routes } from '@/constants'
import { useFavoritesStore } from '@/features/favorites'
import {
	useAddToFavoritesMutation,
	useRemoveFromFavoritesMutation
} from '@/features/favorites/api'
import { toast } from '@/features/notifications'
import { useCurrentMember } from '@/hooks'
import { absoluteUrl } from '@/lib'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import {
	IconDots,
	IconLink,
	IconSettings,
	IconStar,
	IconStarFilled
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useCopyToClipboard } from 'react-use'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'

interface IProjectMenuProps {
	projectId: string
}

export const ProjectMenu = ({ projectId }: IProjectMenuProps) => {
	const router = useRouter()
	const slug = useCurrentWorkspaceSlug()
	const currentMember = useCurrentMember()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()

	const favorites = useFavoritesStore((s) => s.favorites)

	const favorite = useMemo(() => {
		return favorites?.find((f) => f.projectId === projectId)
	}, [favorites, projectId])

	const { mutate: addToFavorites } = useAddToFavoritesMutation()
	const { mutate: removeFromFavorites } = useRemoveFromFavoritesMutation()

	const handleLinkCopy = () => {
		copy(absoluteUrl(Routes.PROJECT_ISSUES(slug, projectId)))

		toast.success('Link copied to clipboard')
	}

	const handleSettings = () => {
		router.push(Routes.PROJECT_SETTINGS(slug, projectId))
	}

	const handleToggleFavorite = () => {
		if (favorite) {
			removeFromFavorites({
				favoriteId: favorite.id,
				memberId: currentMember.id
			})
		} else {
			addToFavorites({ projectId, memberId: currentMember.id })
		}
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
					onPress={handleToggleFavorite}
					className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
					startContent={
						favorite ? (
							<IconStarFilled className="size-4 text-yellow-400" />
						) : (
							<IconStar className="size-4 text-tw-text-200" />
						)
					}
				>
					{favorite ? 'Remove from favorites' : 'Add to favorites'}
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
					href={Routes.PROJECT_SETTINGS(slug, projectId)}
				>
					Settings
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
