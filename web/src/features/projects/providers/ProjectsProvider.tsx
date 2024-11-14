'use client'

import { useSafeContext } from '@/hooks'
import { TypeProjectWithMembers } from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IProjectsStore {
	projects: TypeProjectWithMembers[]
	setProjects: (data: TypeProjectWithMembers[]) => void
	addProject: (data: TypeProjectWithMembers) => void
	removeProject: (id: string) => void
	updateProject: (
		id: string,
		data: Partial<Omit<TypeProjectWithMembers, 'id'>>
	) => void
}

type ProjectsContext = StoreApi<IProjectsStore>

interface IProjectsProviderProps {
	initialProjects?: TypeProjectWithMembers[]
}

const ProjectsContext = createContext<ProjectsContext>({} as ProjectsContext)

export const ProjectsProvider = ({
	children,
	initialProjects
}: PropsWithChildren<IProjectsProviderProps>) => {
	const [store] = useState(
		createStore<IProjectsStore>((set) => ({
			projects: initialProjects || [],
			setProjects: (data) => set({ projects: data }),
			addProject: (data) =>
				set((state) => ({ projects: [...state.projects, data] })),
			removeProject: (id) =>
				set((state) => ({
					projects: state.projects.filter((p) => p.id !== id)
				})),
			updateProject: (id, data) => {
				set((state) => ({
					projects: state.projects.map((p) =>
						p.id === id ? { ...p, ...data } : p
					)
				}))
			}
		}))
	)
	return (
		<ProjectsContext.Provider value={store}>
			{children}
		</ProjectsContext.Provider>
	)
}

const defaultSelector = (state: IProjectsStore) => state

export const useProjectsStore = <T = IProjectsStore,>(
	selector: (store: IProjectsStore) => T = defaultSelector as (
		store: IProjectsStore
	) => T
): T => {
	const context = useSafeContext(ProjectsContext)
	return useStore(context, selector)
}
