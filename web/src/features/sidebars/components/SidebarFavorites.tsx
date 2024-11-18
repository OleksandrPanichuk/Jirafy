'use client'

import { Routes } from '@/constants'
import { useFavoritesStore } from '@/features/favorites'
import { useCurrentWorkspaceSlug } from '@/hooks'
import { useWorkspaceSidebarStore } from '../store'
import { SidebarGroup } from './SidebarGroup'
import { SidebarItem } from './SidebarItem'
import { FavoritesItemMenu } from './FavoritesItemMenu'

export const SidebarFavorites = () => {
	const isCollapsed = useWorkspaceSidebarStore((s) => s.isCollapsed)
	const favorites = useFavoritesStore((s) => s.favorites)
	const slug = useCurrentWorkspaceSlug()

	if (!favorites?.length || isCollapsed) {
		return null
	}

	return (
		<SidebarGroup title="Your favorites">
			{favorites.map((favorite) => (
				<SidebarItem
					classNames={{
						content:
							'w-full flex items-center text-tw-text-400 text-xs font-semibold min-h-[30px] justify-start gap-1.5',
						text: 'truncate text-sm font-medium text-tw-text-200 flex-1',
						container: 'py-0'
					}}
					key={favorite.id}
					href={Routes.PROJECT_ISSUES(slug, favorite.projectId)}
					icon={favorite.project.emoji}
					text={favorite.project.name}
					action={<FavoritesItemMenu favorite={favorite} />}
				/>
			))}
		</SidebarGroup>
	)
}
