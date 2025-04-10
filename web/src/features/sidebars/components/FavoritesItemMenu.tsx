'use client'

import { useRemoveFromFavoritesMutation } from '@/features/favorites/api'
import { TypeFavoritesWithProject } from '@/types'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@heroui/react'
import { IconDots, IconStarFilled } from '@tabler/icons-react'

interface IFavoritesItemMenuProps {
	favorite: TypeFavoritesWithProject
}

export const FavoritesItemMenu = ({ favorite }: IFavoritesItemMenuProps) => {
	const { mutate: removeFromFavorites } = useRemoveFromFavoritesMutation()

	const handleRemoveFromFavorites = () => {
		removeFromFavorites({
			favoriteId: favorite.id,
			memberId: favorite.memberId
		})
	}

	return (
		<Dropdown
			placement={'bottom-end'}
			classNames={{
				content: 'rounded-md border border-tw-border-400 bg-tw-bg-100'
			}}
		>
			<DropdownTrigger>
				<Button
					variant="light"
					size="sm"
					className="!size-6 !min-w-0 text-inherit"
					as="button"
					onClick={(e) => {
						e.stopPropagation()
						e.preventDefault()
					}}
					isIconOnly
				>
					<IconDots className="size-4" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownItem
					key={'remove-from-favorites'}
					variant="flat"
					onPress={handleRemoveFromFavorites}
					className="text-tw-text-200  hover:!text-tw-text-200 hover:!bg-tw-bg-80 rounded-md"
					startContent={<IconStarFilled className="size-4 text-yellow-400" />}
				>
					Remove from favorites
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
