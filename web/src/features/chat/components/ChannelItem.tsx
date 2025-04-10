'use client'

import { DEFAULT_CHANNEL_NAME } from '@/constants'
import { Button } from '@/features/shared'
import { ChannelType, TypeChannel } from '@/types'
import { Tooltip } from '@heroui/react'
import { IconEdit, IconLock, IconTrash } from '@tabler/icons-react'

interface IChannelItemProps {
	data: TypeChannel
}

export const ChannelItem = ({ data }: IChannelItemProps) => {
	return (
		<div className="text-tw-text-200 hover:bg-tw-bg-90 flex items-center gap-1.5 w-full justify-between px-2 py-1 cursor-pointer rounded group">
			<p className="flex gap-2 items-center w-full text-xs leading-5 font-medium ">
				<span> {data.type === ChannelType.TEXT && '#'}</span>
				<span>{data.name}</span>
			</p>
			<div className="flex gap-1">
				{data.name === DEFAULT_CHANNEL_NAME ? (
					<Tooltip
						content={<span className="text-sm">This is a default channel</span>}
					>
						<div className="flex items-center justify-center size-6 opacity-0 group-hover:opacity-100 transition-all">
							<IconLock className="size-4" />
						</div>
					</Tooltip>
				) : (
					<>
						{/* TODO: edit channel modal */}
						<Tooltip content={<span className="text-sm">Edit</span>}>
							<Button
								size="sm"
								className="!size-6 !min-w-0 text-tw-text-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
								variant="light"
								isIconOnly
							>
								<IconEdit className="size-4" />
							</Button>
						</Tooltip>
						{/* TODO: delete channel functionality */}
						<Tooltip content={<span className="text-sm">Delete</span>}>
							<Button
								size="sm"
								className="!size-6 !min-w-0 text-tw-text-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
								variant="light"
								isIconOnly
							>
								<IconTrash className="size-4" />
							</Button>
						</Tooltip>
					</>
				)}
			</div>
		</div>
	)
}
