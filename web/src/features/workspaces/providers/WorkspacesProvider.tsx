'use client'

import { useSafeContext } from '@/hooks'
import { MemberRole, TypeWorkspace, TypeWorkspaceWithMembers } from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IWorkspacesStore {
	workspaces: TypeWorkspaceWithMembers[]
	setWorkspaces: (workspaces: TypeWorkspaceWithMembers[]) => void
	addWorkspace: (workspace: TypeWorkspace) => void
	removeWorkspace: (workspace: TypeWorkspaceWithMembers) => void
	updateWorkspace: (workspace: Partial<TypeWorkspaceWithMembers>) => void
	selectWorkspace: (id: string) => void
}

type WorkspacesContext = StoreApi<IWorkspacesStore>

interface IWorkspacesProviderProps {
	initialWorkspaces?: TypeWorkspaceWithMembers[]
}

const WorkspacesContext = createContext<WorkspacesContext>(
	{} as WorkspacesContext
)

export const WorkspacesProvider = ({
	children,
	initialWorkspaces
}: PropsWithChildren<IWorkspacesProviderProps>) => {
	const [store] = useState(
		createStore<IWorkspacesStore>((set) => ({
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
						{
							...data,
							members: [
								{
									defaultAssignee: true,
									isLead: true,
									isWorkspaceSelected: true,
									role: MemberRole.OWNER
								}
							]
						}
					]
				})),
			removeWorkspace: (data) =>
				set((state) => ({
					workspaces: state.workspaces.filter((w) => w.id !== data.id)
				})),
			updateWorkspace: (data) =>
				set((state) => ({
					workspaces: state.workspaces.map((w) =>
						w.id === data.id ? { ...w, ...data } : w
					)
				})),
			selectWorkspace: (id) =>
				set((state) => ({
					workspaces: state.workspaces.map((w) => ({
						...w,
						members: w.members.map((m) => ({
							...m,
							isWorkspaceSelected: w.id === id
						}))
					}))
				}))
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