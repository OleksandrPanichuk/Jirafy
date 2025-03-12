'use client'

import {
	CreateDateSelectOptions,
	TypeProjectsFilters
} from '@/features/projects'
import { useSafeContext } from '@/hooks'
import { OmitTyped, SortOrder } from '@/types'
import { useGetCookie } from 'cookies-next'
import { createContext, PropsWithChildren, useMemo, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IProjectsFiltersStore extends TypeProjectsFilters {
	setSearchValue: (value: TypeProjectsFilters['searchValue']) => void
	setNetwork: (value: TypeProjectsFilters['network']) => void
	setSortOrder: (value: TypeProjectsFilters['sortOrder']) => void
	setSortBy: (value: TypeProjectsFilters['sortBy']) => void
	addLeaderId: (value: string) => void
	removeLeaderId: (value: string) => void
	toggleOnlyMyProjects: () => void
	setBeforeDate: (value: Date | undefined) => void
	setAfterDate: (value: Date | undefined) => void

	selectedDateOption: CreateDateSelectOptions | undefined
	setSelectedDateOption: (value: CreateDateSelectOptions | undefined) => void
}

type ProjectsFiltersContext = StoreApi<IProjectsFiltersStore>

const ProjectsFiltersContext = createContext<ProjectsFiltersContext>(
	{} as ProjectsFiltersContext
)

const defaultFilters = {
	sortBy: 'createdAt',
	sortOrder: SortOrder.ASC,
	leadersIds: [],
	network: [],
	onlyMyProjects: false,
	searchValue: ''
} satisfies OmitTyped<TypeProjectsFilters, 'takeMembers'>

export const ProjectsFiltersProvider = ({ children }: PropsWithChildren) => {
	const getCookie = useGetCookie()

	const filtersString = getCookie('projects-filters')

	const filters: OmitTyped<TypeProjectsFilters, 'takeMembers'> = useMemo(
		() => (filtersString ? JSON.parse(filtersString) : defaultFilters),
		[filtersString]
	)

	const [store] = useState(
		createStore<IProjectsFiltersStore>((set, get) => ({
			...filters,
			setSearchValue: (value) => set({ searchValue: value }),
			setNetwork: (value) => set({ network: value }),
			setSortOrder: (value) => set({ sortOrder: value }),
			setSortBy: (value) => set({ sortBy: value }),
			addLeaderId: (value) =>
				set(() => ({
					leadersIds: [...(get().leadersIds ?? []), value]
				})),
			removeLeaderId: (value) =>
				set(() => ({
					leadersIds: get().leadersIds?.filter((id) => id !== value)
				})),
			toggleOnlyMyProjects: () =>
				set(() => ({
					onlyMyProjects: !get().onlyMyProjects
				})),
			setBeforeDate: (value) =>
				set(() => ({
					beforeDate: value
				})),
			setAfterDate: (value) =>
				set(() => ({
					afterDate: value
				})),
			setSelectedDateOption: (value) =>
				set(() => ({
					selectedDateOption: value
				})),
			selectedDateOption: CreateDateSelectOptions.NONE
		}))
	)
	return (
		<ProjectsFiltersContext.Provider value={store}>
			{children}
		</ProjectsFiltersContext.Provider>
	)
}

const defaultSelector = (state: IProjectsFiltersStore) => state

export const useProjectsFiltersStore = <T = IProjectsFiltersStore,>(
	selector: (store: IProjectsFiltersStore) => T = defaultSelector as (
		store: IProjectsFiltersStore
	) => T
): T => {
	const context = useSafeContext(ProjectsFiltersContext)
	return useStore(context, selector)
}
