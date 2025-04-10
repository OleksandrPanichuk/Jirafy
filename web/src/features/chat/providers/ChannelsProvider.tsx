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
	addGroup: (data: TypeChannelsGroupWithChannels) => void
	addChannel: (groupId: string, data: TypeChannel) => void
	removeChannel: (groupId: string, channelId: string) => void
	updateChannel: (
		groupId: string,
		channelId: string,
		data: Partial<TypeChannel>
	) => void
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
			removeChannel: (groupId, channelId) =>
				set((state) => ({
					channelsGroups: state.channelsGroups.map((group) =>
						group.id === groupId
							? {
									...group,
									channels: group.channels.filter(
										(channel) => channel.id !== channelId
									)
								}
							: group
					)
				})),
			updateChannel: (groupId, channelId, data) =>
				set((state) => ({
					channelsGroups: state.channelsGroups.map((group) =>
						group.id === groupId
							? {
									...group,
									channels: group.channels.map((channel) =>
										channel.id === channelId ? { ...channel, ...data } : channel
									)
								}
							: group
					)
				})),
			updateGroup: (groupId, data) =>
				set((state) => ({
					channelsGroups: state.channelsGroups.map((group) =>
						group.id === groupId ? { ...group, ...data } : group
					)
				})),
			removeGroup: (groupId) =>
				set((state) => ({
					channelsGroups: state.channelsGroups.filter(
						(group) => group.id !== groupId
					)
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
