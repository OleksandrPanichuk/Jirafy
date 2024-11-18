export type TypeFavorites = {
	id: string
	memberId: string
	projectId: string
}

export type TypeFavoritesWithProject = TypeFavorites & {
	project: {
		id: string
		name: string
		emoji: string
	}
}
