'use client'

import { useSafeContext } from '@/hooks'
import {
	TypeChannel,
	TypeChannelsGroup,
	TypeChannelsGroupWithChannels
} from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

interface IChannelsStore {
	channelsGroups: TypeChannelsGroupWithChannels[]
	searchValue: string
	setSearchValue: (value: string) => void
	addGroup: (data: TypeChannelsGroupWithChannels) => void
	addChannel: (groupId: string, data: TypeChannel) => void
	removeChannel: (channelId: string) => void
	updateChannel: (channelId: string, data: Partial<TypeChannel>) => void
	updateGroup: (groupId: string, data: Partial<TypeChannelsGroup>) => void
	removeGroup: (groupId: string) => void
}

type ChannelsContext = StoreApi<IChannelsStore>

interface IChannelsProviderProps {
	initialData?: TypeChannelsGroupWithChannels[]
}

const ChannelsContext = createContext<ChannelsContext>({} as ChannelsContext)

export const ChannelsProvider = ({
	children,
	initialData
}: PropsWithChildren<IChannelsProviderProps>) => {
	const [store] = useState(
		createStore<IChannelsStore>((set) => ({
			searchValue: '',
			setSearchValue: (value) => set({ searchValue: value }),
			channelsGroups: initialData || [],
			addGroup: (data) =>
				set((state) => ({
					channelsGroups: [...state.channelsGroups, data]
				})),
			addChannel: (groupId, data) =>
				set((state) => ({
					channelsGroups: state.channelsGroups.map((group) =>
						group.id === groupId
							? { ...group, channels: [...group.channels, data] }
							: group
					)
				})),
			removeChannel: (channelId) =>
				set((state) => ({
					channelsGroups: state.channelsGroups.map((group) => ({
						...group,
						channels: group.channels.filter((c) => c.id !== channelId)
					}))
				})),
			updateChannel: (channelId, data) =>
				set((state) => {
					const fromGroup = state.channelsGroups.find((g) =>
						g.channels.some((c) => c.id === channelId)
					)
					if (!fromGroup) return state
					const channel = fromGroup.channels.find((c) => c.id === channelId)!
					const oldGroupId = fromGroup.id

					const updatedChannel = { ...channel, ...data }
					const targetGroupId = updatedChannel.groupId ?? oldGroupId

					return {
						channelsGroups: state.channelsGroups.map((group) => {
							if (group.id === oldGroupId && oldGroupId === targetGroupId) {
								return {
									...group,
									channels: group.channels.map((c) =>
										c.id === channelId ? updatedChannel : c
									)
								}
							}

							if (group.id === oldGroupId) {
								return {
									...group,
									channels: group.channels.filter((c) => c.id !== channelId)
								}
							}
							if (group.id === targetGroupId) {
								return {
									...group,
									channels: [...group.channels, updatedChannel]
								}
							}
							return group
						})
					}
				}),
			updateGroup: (groupId, data) =>
				set((state) => ({
					channelsGroups: state.channelsGroups.map((group) =>
						group.id === groupId ? { ...group, ...data } : group
					)
				})),
			removeGroup: (groupId) =>
				set((state) => ({
					channelsGroups: state.channelsGroups.filter((g) => g.id !== groupId)
				}))
		}))
	)

	// TODO: add additional fetching for channels groups

	return (
		<ChannelsContext.Provider value={store}>
			{children}
		</ChannelsContext.Provider>
	)
}

const defaultSelector = (state: IChannelsStore) => state

export const useChannelsStore = <T = IChannelsStore,>(
	selector: (store: IChannelsStore) => T = defaultSelector as (
		store: IChannelsStore
	) => T
): T => {
	const context = useSafeContext(ChannelsContext)
	return useStore(context, selector)
}
