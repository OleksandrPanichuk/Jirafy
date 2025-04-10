import { create } from 'zustand'

type ModalVariant = 'create' | 'edit'

interface IChannelsGroupModalStore {
	isOpen: boolean
	variant: ModalVariant
	groupId?: string
	name?: string
	open: (variant?: ModalVariant, data?: { id: string; name: string }) => void
	close: () => void
}

export const useChannelsGroupModalStore = create<IChannelsGroupModalStore>(
	(set) => ({
		isOpen: false,
		variant: 'create',
		groupId: undefined,
		name: undefined,
		open: (variant = 'create', data) =>
			set({ isOpen: true, variant, name: data?.name, groupId: data?.id }),
		close: () => set({ isOpen: false, groupId: undefined, name: undefined })
	})
)
