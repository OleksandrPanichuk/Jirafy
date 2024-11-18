'use server'

import { FavoritesApi } from './favorites.service'

export async function getAllFavoritesByWorkspaceSlug(slug: string) {
	try {
		return await FavoritesApi.findAllByWorkspaceSlug(slug)
	} catch (err) {
		return []
	}
}
