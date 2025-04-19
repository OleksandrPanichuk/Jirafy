import { ChannelType } from '@/types'
import { create } from 'zustand'
import { ModalVariants } from '../types'

type ChannelData = {
	id: string
	name: string
	groupId: string
	type: ChannelType
}

interface IChannelsModalStore {
	isOpen: boolean
	variant: ModalVariants
	data?: Partial<ChannelData>
	open: (variant?: ModalVariants, data?: Partial<ChannelData>) => void
	close: () => void
}

export const useChannelsModalStore = create<IChannelsModalStore>((set) => ({
	isOpen: false,
	variant: ModalVariants.CREATE,
	open: (variant = ModalVariants.CREATE, data) =>
		set({ isOpen: true, variant, data }),
	close: () => set({ isOpen: false, data: undefined })
}))
