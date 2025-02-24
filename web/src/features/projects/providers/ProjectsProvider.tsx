'use client'

import { useSafeContext } from '@/hooks'
import { TypeProjectWithCurrentMember } from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IProjectsStore {
	projects: TypeProjectWithCurrentMember[]
	setProjects: (data: TypeProjectWithCurrentMember[]) => void
	addProject: (data: TypeProjectWithCurrentMember) => void
	removeProject: (id: string) => void
	updateProject: (
		id: string,
		data: Partial<Omit<TypeProjectWithCurrentMember, 'id'>>
	) => void
}

type ProjectsContext = StoreApi<IProjectsStore>

interface IProjectsProviderProps {
	initialProjects?: TypeProjectWithCurrentMember[]
}

const ProjectsContext = createContext<ProjectsContext>({} as ProjectsContext)

export const ProjectsProvider = ({
	children,
	initialProjects
}: PropsWithChildren<IProjectsProviderProps>) => {
	const [store] = useState(
		createStore<IProjectsStore>((set) => ({
			projects:
				initialProjects?.sort(
					(a, b) => a.members[0].projectOrder - b.members[0].projectOrder
				) || [],
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
