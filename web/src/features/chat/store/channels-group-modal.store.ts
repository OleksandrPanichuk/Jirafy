import { create } from 'zustand'
import { ModalVariants } from '../types'

interface IChannelsGroupModalStore {
	isOpen: boolean
	variant: ModalVariants
	groupId?: string
	name?: string
	open: (variant?: ModalVariants, data?: { id: string; name: string }) => void
	close: () => void
}

export const useChannelsGroupModalStore = create<IChannelsGroupModalStore>(
	(set) => ({
		isOpen: false,
		variant: ModalVariants.CREATE,
		groupId: undefined,
		name: undefined,
		open: (variant = ModalVariants.CREATE, data) =>
			set({ isOpen: true, variant, name: data?.name, groupId: data?.id }),
		close: () => set({ isOpen: false, groupId: undefined, name: undefined })
	})
)
