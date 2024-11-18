import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
import { TypeFavoritesWithProject } from '@/types'
import {
	AddToFavoritesInput,
	addToFavoritesSchema,
	RemoveFromFavoritesInput,
	removeFromFavoritesSchema
} from './favorites.dto'

const findAllByWorkspaceSlug = async (slug: string) => {
	return (
		await axios.get<TypeFavoritesWithProject[]>(
			ApiRoutes.FAVORITES.BY_WORKSPACE_SLUG(slug)
		)
	).data
}

const add = async (input: AddToFavoritesInput) => {
	addToFavoritesSchema.parse(input)
	return await axios.post<TypeFavoritesWithProject>(
		ApiRoutes.FAVORITES.ROOT,
		input
	)
}

const remove = async (input: RemoveFromFavoritesInput) => {
	removeFromFavoritesSchema.parse(input)
	return await axios.delete(ApiRoutes.FAVORITES.ROOT, { data: input })
}

export const FavoritesApi = {
	findAllByWorkspaceSlug,
	add,
	remove
} as const
