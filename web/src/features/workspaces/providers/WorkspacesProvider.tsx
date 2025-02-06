'use client'

import { useSelectWorkspaceMutation } from '@/features/workspaces'
import { useSafeContext } from '@/hooks'
import { TypeWorkspaceWithMembers } from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IWorkspacesStore {
	workspaces: TypeWorkspaceWithMembers[]
	setWorkspaces: (workspaces: TypeWorkspaceWithMembers[]) => void
	addWorkspace: (workspace: TypeWorkspaceWithMembers) => void
	removeWorkspace: (id: string) => void
	updateWorkspace: (
		id: string,
		workspace: Partial<Omit<TypeWorkspaceWithMembers, 'id'>>
	) => void
	selectWorkspace: (slug: string) => void
	getCurrentWorkspace: () => TypeWorkspaceWithMembers | undefined
	getWorkspaceBySlug: (slug: string) => TypeWorkspaceWithMembers | undefined
	getWorkspaceById: (id: string) => TypeWorkspaceWithMembers | undefined
}

type WorkspacesContext = StoreApi<IWorkspacesStore>

interface IWorkspacesProviderProps extends PropsWithChildren {
	initialWorkspaces?: TypeWorkspaceWithMembers[]
}

const WorkspacesContext = createContext<WorkspacesContext>(
	{} as WorkspacesContext
)

export const WorkspacesProvider = ({
	children,
	initialWorkspaces
}: IWorkspacesProviderProps) => {
	const { mutate: selectWorkspaceServer } = useSelectWorkspaceMutation()

	const [store] = useState(
		createStore<IWorkspacesStore>((set, get) => ({
			workspaces: initialWorkspaces || [],
			setWorkspaces: (data) => set({ workspaces: data }),
			addWorkspace: (data) =>
				set((state) => ({
					workspaces: [
						...state.workspaces.map((w) => ({
							...w,
							members: [
								...w.members.map((m) => ({ ...m, isWorkspaceSelected: false }))
							]
						})),
						data
					]
				})),
			removeWorkspace: (id) =>
				set((state) => ({
					workspaces: state.workspaces.filter((w) => w.id !== id)
				})),
			updateWorkspace: (id, data) =>
				set((state) => ({
					workspaces: state.workspaces.map((w) =>
						w.id === id ? { ...w, ...data } : w
					)
				})),
			getCurrentWorkspace: () => {
				return get().workspaces.find((w) => {
					return w.members.find((m) => m.isWorkspaceSelected)
				})
			},
			selectWorkspace: (slug) => {
				const workspace = get().workspaces.find((w) => w.slug === slug)
				if (workspace) {
					set((state) => ({
						workspaces: state.workspaces.map((w) => ({
							...w,
							members: w.members.map((m) => ({
								...m,
								isWorkspaceSelected: w.id === workspace.id
							}))
						}))
					}))
					selectWorkspaceServer({ workspaceId: workspace.id })
				}
			},
			getWorkspaceBySlug: (slug) => {
				return get().workspaces.find((w) => w.slug === slug)
			},
			getWorkspaceById: (id) => {
				return get().workspaces.find((w) => w.id === id)
			}
		}))
	)

	return (
		<WorkspacesContext.Provider value={store}>
			{children}
		</WorkspacesContext.Provider>
	)
}

const defaultSelector = (state: IWorkspacesStore) => state

export const useWorkspacesStore = <T = IWorkspacesStore,>(
	selector: (store: IWorkspacesStore) => T = defaultSelector as (
		store: IWorkspacesStore
	) => T
): T => {
	const context = useSafeContext(WorkspacesContext)
	return useStore(context, selector)
}
