'use client'

import { useLocalStorage, useSafeContext } from '@/hooks'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IProfileSidebarStore {
	isCollapsed: boolean
	setIsCollapsed: (isCollapsed: boolean) => void
	toggle: () => void
}

type ProfileSidebarContextType = StoreApi<IProfileSidebarStore>

const ProfileSidebarContext = createContext<ProfileSidebarContextType>(
	{} as ProfileSidebarContextType
)

interface IProfileSidebarProviderProps extends PropsWithChildren {
	alwaysOpen?: boolean
}

export const ProfileSidebarProvider = ({
	children,
	alwaysOpen = false
}: IProfileSidebarProviderProps) => {
	const [storageIsOpen, setIsOpen] = useLocalStorage('profile-sidebar', false)

	const [store] = useState(
		createStore<IProfileSidebarStore>((set, get) => ({
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
		<ProfileSidebarContext.Provider value={store}>
			{children}
		</ProfileSidebarContext.Provider>
	)
}

const defaultSelector = (state: IProfileSidebarStore) => state

export const useProfileSidebarStore = <T = IProfileSidebarStore,>(
	selector: (store: IProfileSidebarStore) => T = defaultSelector as (
		store: IProfileSidebarStore
	) => T
): T => {
	const context = useSafeContext(ProfileSidebarContext)
	return useStore(context, selector)
}
