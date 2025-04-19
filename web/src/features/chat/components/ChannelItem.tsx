'use client'

import { DEFAULT_CHANNEL_NAME, Routes } from '@/constants'
import {
	ModalVariants,
	useChannelsModalStore,
	useDeleteChannelMutation
} from '@/features/chat'
import { useCurrentWorkspaceMember } from '@/features/members'
import { Button } from '@/features/shared'
import { useCurrentWorkspaceSlug } from '@/features/workspaces'
import { useConfirm } from '@/hooks'
import { checkMemberPermissions, cn } from '@/lib'
import { ChannelType, TypeChannel } from '@/types'
import { Tooltip } from '@heroui/react'
import {
	IconEdit,
	IconHash,
	IconLock,
	IconMicrophone,
	IconTrash
} from '@tabler/icons-react'
import { useRouter } from 'next-nprogress-bar'
import { useParams } from 'next/navigation'

interface IChannelItemProps {
	data: TypeChannel
}

export const ChannelItem = ({ data }: IChannelItemProps) => {
	const [ConfirmationModal, confirm] = useConfirm()

	const slug = useCurrentWorkspaceSlug()
	const params = useParams()
	const router = useRouter()

	const channelId = params.channelId as string | undefined

	const isSelected = channelId === data.id

	const { mutate: deleteChannel } = useDeleteChannelMutation()
	const { role } = useCurrentWorkspaceMember()

	const openChannelModal = useChannelsModalStore((s) => s.open)

	const handleChannelDelete = async () => {
		const ok = await confirm()

		if (!ok) {
			return
		}

		deleteChannel(data.id)
	}

	return (
		<>
			<ConfirmationModal />
			<div
				onClick={() => router.push(Routes.CHANNEL_BY_ID(slug, data.id))}
				className={cn(
					'text-tw-text-200 hover:bg-tw-bg-90 flex items-center gap-1.5 w-full justify-between px-2 py-1 cursor-pointer rounded group',
					isSelected && 'bg-neutral-800 hover:bg-neutral-800'
				)}
			>
				<p className="flex gap-2 items-center w-full text-xs leading-5 font-medium ">
					{data.type === ChannelType.TEXT ? (
						<IconHash className="size-3.5" />
					) : (
						<IconMicrophone className="size-3.5" />
					)}

					<span>{data.name}</span>
				</p>
				{checkMemberPermissions(role) && (
					<>
						<div className="flex gap-1">
							{data.name === DEFAULT_CHANNEL_NAME ? (
								<Tooltip
									content={
										<span className="text-sm">This is a default channel</span>
									}
								>
									<div className="flex items-center justify-center size-6 opacity-0 group-hover:opacity-100 transition-all">
										<IconLock className="size-4" />
									</div>
								</Tooltip>
							) : (
								<>
									<Tooltip content={<span className="text-sm">Edit</span>}>
										<Button
											size="sm"
											className="!size-6 !min-w-0 text-tw-text-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
											variant="light"
											onPress={() =>
												openChannelModal(ModalVariants.UPDATE, data)
											}
											isIconOnly
										>
											<IconEdit className="size-4" />
										</Button>
									</Tooltip>
									<Tooltip content={<span className="text-sm">Delete</span>}>
										<Button
											size="sm"
											className="!size-6 !min-w-0 text-tw-text-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
											variant="light"
											onPress={handleChannelDelete}
											isIconOnly
										>
											<IconTrash className="size-4" />
										</Button>
									</Tooltip>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</>
	)
}
