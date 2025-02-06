'use client'

import { useLocalStorage, useSafeContext } from '@/hooks'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IWorkspaceSidebarStore {
	isCollapsed: boolean
	setIsCollapsed: (isCollapsed: boolean) => void
	toggle: () => void
}

type WorkspaceSidebarContextType = StoreApi<IWorkspaceSidebarStore>

const WorkspaceSidebarContext = createContext<WorkspaceSidebarContextType>(
	{} as WorkspaceSidebarContextType
)

interface IWorkspaceSidebarProviderProps extends PropsWithChildren {
	alwaysOpen?: boolean
}

export const WorkspaceSidebarProvider = ({
	children,
	alwaysOpen = false
}: IWorkspaceSidebarProviderProps) => {
	const [storageIsOpen, setIsOpen] = useLocalStorage('workspace-sidebar', false)

	const [store] = useState(
		createStore<IWorkspaceSidebarStore>((set, get) => ({
			isCollapsed: alwaysOpen ? !alwaysOpen : true,
			setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
			toggle: () => {
				setIsOpen(get().isCollapsed)
			}
		}))
	)
	const setIsCollapsed = useStore(store, (s) => s.setIsCollapsed)

	useEffect(() => {
		if (storageIsOpen !== undefined && !alwaysOpen) {
			setIsCollapsed(!storageIsOpen)
		}
	}, [storageIsOpen, setIsCollapsed, alwaysOpen])

	return (
		<WorkspaceSidebarContext.Provider value={store}>
			{children}
		</WorkspaceSidebarContext.Provider>
	)
}

const defaultSelector = (state: IWorkspaceSidebarStore) => state

export const useWorkspaceSidebarStore = <T = IWorkspaceSidebarStore,>(
	selector: (store: IWorkspaceSidebarStore) => T = defaultSelector as (
		store: IWorkspaceSidebarStore
	) => T
): T => {
	const context = useSafeContext(WorkspaceSidebarContext)
	return useStore(context, selector)
}
