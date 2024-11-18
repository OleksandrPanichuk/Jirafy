'use client'

import { useSafeContext } from '@/hooks'
import { TypeFavoritesWithProject } from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IFavoritesStore {
	favorites: TypeFavoritesWithProject[]
	add: (data: TypeFavoritesWithProject) => void
	remove: (id: string) => void
	getByProjectId: (id: string) => TypeFavoritesWithProject | undefined
}

type FavoritesContext = StoreApi<IFavoritesStore>

interface IFavoritesProviderProps {
	initialData?: TypeFavoritesWithProject[]
}

const FavoritesContext = createContext<FavoritesContext>({} as FavoritesContext)

export const FavoritesProvider = ({
	children,
	initialData
}: PropsWithChildren<IFavoritesProviderProps>) => {
	const [store] = useState(
		createStore<IFavoritesStore>((set, get) => ({
			favorites: initialData ?? [],
			add: (data) =>
				set((state) => ({ favorites: [...state.favorites, data] })),
			remove: (id) =>
				set((state) => ({
					favorites: state.favorites.filter((item) => item.id !== id)
				})),
			getByProjectId: (projectId) => {
				const { favorites } = get()
				const item = favorites.find((item) => item.projectId === projectId)
				return item
			}
		}))
	)
	return (
		<FavoritesContext.Provider value={store}>
			{children}
		</FavoritesContext.Provider>
	)
}

const defaultSelector = (state: IFavoritesStore) => state

export const useFavoritesStore = <T = IFavoritesStore,>(
	selector: (store: IFavoritesStore) => T = defaultSelector as (
		store: IFavoritesStore
	) => T
): T => {
	const context = useSafeContext(FavoritesContext)
	return useStore(context, selector)
}
