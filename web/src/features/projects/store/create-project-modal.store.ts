import { create } from "zustand"

interface ICreateProjectModalStore {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useCreateProjectModalStore = create<ICreateProjectModalStore>((set) => ({
	isOpen: false,
	open: () => set(() => ({ isOpen: true })),
	close: () => set(() => ({ isOpen: false })),
}))