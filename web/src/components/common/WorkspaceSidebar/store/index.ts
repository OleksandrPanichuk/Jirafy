import { create } from 'zustand'

interface IWorkspaceSidebarStore {
	isCollapsed: boolean
	setIsCollapsed: (isCollapsed: boolean) => void
}

export const useWorkspaceSidebarStore = create<IWorkspaceSidebarStore>(
	(set) => ({
		isCollapsed: true,
		setIsCollapsed: (isCollapsed) => set({ isCollapsed })
	})
)
