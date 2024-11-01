import { create } from 'zustand'

interface IWorkspaceSidebarStore {
	isCollapsed: boolean
	setIsCollapsed: (isCollapsed: boolean) => void
}

export const useWorkspaceSidebarStore = create<IWorkspaceSidebarStore>(
	(set) => ({
		isCollapsed: false,
		setIsCollapsed: (isCollapsed) => set({ isCollapsed })
	})
)
