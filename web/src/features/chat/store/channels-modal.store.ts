import { ChannelType } from '@/types'
import { create } from 'zustand'

type ModalVariant = 'create' | 'edit'

type ChannelData = {
	id: string
	name: string
	groupId: string
	type: ChannelType
}

interface IChannelsModalStore {
	isOpen: boolean
	variant: ModalVariant
	data?: Partial<ChannelData>
	open: (variant?: ModalVariant, data?: Partial<ChannelData>) => void
	close: () => void
}

export const useChannelsModalStore = create<IChannelsModalStore>((set) => ({
	isOpen: false,
	variant: 'create',
	open: (variant = 'create', data) => set({ isOpen: true, variant, data }),
	close: () => set({ isOpen: false, data: undefined })
}))
