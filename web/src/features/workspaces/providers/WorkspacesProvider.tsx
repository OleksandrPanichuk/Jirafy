'use client'

import { useSelectWorkspaceMutation } from '@/features/workspaces'
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
	selectWorkspace: (slug: string) => void
	getCurrentWorkspace: () => TypeWorkspaceWithMembers | undefined
	getWorkspaceBySlug: (slug: string) => TypeWorkspaceWithMembers | undefined
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

export const useCurrentWorkspace = () => {
	const workspace = useWorkspacesStore((s) => s.getCurrentWorkspace)()
	if (!workspace) {
		throw new Error('No workspace selected')
	}

	return workspace
}
