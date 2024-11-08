"use client"

import { useSafeContext } from '@/hooks'
import { TypeProject } from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IProjectsStore {
	projects: TypeProject[]
	setProjects: (data: TypeProject[]) => void
	addProject: (data: TypeProject) => void
	removeProject: (id: string) => void
	updateProject: (id: string, data: Partial<Omit<TypeProject, 'id'>>) => void
}

type ProjectsContext = StoreApi<IProjectsStore>

interface IProjectsProviderProps {
	initialProjects?: TypeProject[]
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
