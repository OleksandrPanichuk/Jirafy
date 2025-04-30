'use client'

import { ChannelType } from '@/types'
import { IconHash, IconMicrophone } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { useChannelsStore } from '../providers'
import { ChannelSettingsDropdown } from './ChannelSettingsDropdown'

interface IParams {
	channelId: string
}

export const ChannelHeader = () => {
	const { channelId } = useParams() as unknown as IParams

	const groups = useChannelsStore((s) => s.channelsGroups)

	const channel = useMemo(() => {
		const group = groups.find((group) =>
			group.channels.some((channel) => channel.id === channelId)
		)

		if (!group) {
			return null
		}

		return group.channels.find((channel) => channel.id === channelId)
	}, [channelId, groups])

	if (!channel) {
		return null
	}

	return (
		<header className="bg-neutral-900/50 w-full h-10">
			<div className="flex p-4 items-center h-full justify-between ">
				<p className="text-sm font-medium flex items-center gap-2">
					{channel.type === ChannelType.TEXT ? (
						<IconHash className="size-3.5 shrink-0" />
					) : (
						<IconMicrophone className="size-3.5 shrink-0" />
					)}
					{channel.name}
				</p>
				{/* TODO: show members that are currently in this channel */}
				<ChannelSettingsDropdown channel={channel} />
			</div>
		</header>
	)
}
