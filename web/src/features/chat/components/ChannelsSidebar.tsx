'use client'

import { useChannelsStore } from '@/features/chat'
import { Divider } from '@heroui/react'
import { Fragment } from 'react'
import { ChannelsGroup } from './ChannelsGroup'
import { CreateChannelButton } from './CreateChannelButton'
import { SearchInput } from './SearchInput'

export const ChannelsSidebar = () => {
	const data = useChannelsStore((s) => s.channelsGroups)
	return (
		<div className="flex flex-col gap-4 p-3 w-full">
			<div className="flex items-center gap-2 w-full">
				<SearchInput />
				<CreateChannelButton />
			</div>
			<div className="flex flex-col gap-2 overflow-auto pb-4">
				{data.map((group, i) => (
					<Fragment key={group.id}>
						<ChannelsGroup data={group} />
						{i !== data.length - 1 && <Divider />}
					</Fragment>
				))}
			</div>
		</div>
	)
}
