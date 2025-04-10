import {
	useChannelsGroupModalStore,
	useDeleteChannelsGroupMutation
} from '@/features/chat'
import { Button } from '@/features/shared'
import { useConfirm } from '@/hooks'
import { TypeChannelsGroupWithChannels } from '@/types'
import { Accordion, AccordionItem, Tooltip } from '@heroui/react'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { ChannelItem } from './ChannelItem'

interface IChannelsGroupProps {
	data: TypeChannelsGroupWithChannels
}

export const ChannelsGroup = ({ data }: IChannelsGroupProps) => {
	const [ConfirmationModal, confirm] = useConfirm()
	const { mutate: deleteGroup } = useDeleteChannelsGroupMutation()
	const openChannelsGroupModal = useChannelsGroupModalStore((s) => s.open)

	const handleGroupDelete = async () => {
		const ok = await confirm()

		if (!ok) {
			return
		}

		deleteGroup(data.id)
	}
	return (
		<>
			<ConfirmationModal />
			<Accordion
				className={'!px-0'}
				itemClasses={{
					trigger:
						' data-[hover=true]:bg-tw-bg-90 rounded sticky top-0 py-0 px-2  gap-1, t-2.5',
					content: '!p-0 flex flex-col items-center gap-0.5'
				}}
				defaultSelectedKeys={[data.name]}
			>
				<AccordionItem
					key={data.name}
					title={
						<div
							className={
								'w-full min-h-[30px] flex justify-between items-center text-tw-text-400 text-xs font-semibold group'
							}
						>
							<span className={'text-[0.675rem] truncate'}>{data.name}</span>
							<div className={'flex items-center gap-1'}>
								{/* TODO: edit group modal */}
								<Tooltip content={<span className="text-sm">Edit</span>}>
									<Button
										className="!size-6  opacity-0 group-hover:opacity-100 transition-all !min-w-0 text-inherit hover:text-white"
										variant={'light'}
										as="div"
										size="sm"
										onPress={() => {
											openChannelsGroupModal('edit', {
												id: data.id,
												name: data.name
											})
										}}
										isIconOnly
									>
										<IconEdit className="size-4" />
									</Button>
								</Tooltip>
								<Tooltip content={<span className="text-sm">Add channel</span>}>
									{/* TODO: onclick: open add new channel modal */}
									<Button
										className="!size-6 !min-w-0 text-inherit opacity-0 group-hover:opacity-100 transition-all hover:text-white"
										variant={'light'}
										as="div"
										size="sm"
										isIconOnly
									>
										<IconPlus className="size-4" />
									</Button>
								</Tooltip>
								{data.channels.length === 0 && (
									<Tooltip
										content={<span className="text-sm">Delete group</span>}
									>
										<Button
											className="!size-6 !min-w-0 text-inherit opacity-0 group-hover:opacity-100 transition-all  hover:text-rose-600"
											variant={'light'}
											as="div"
											size="sm"
											onPress={handleGroupDelete}
											isIconOnly
										>
											<IconTrash className="size-4" />
										</Button>
									</Tooltip>
								)}
							</div>
						</div>
					}
				>
					{data.channels.map((channel) => (
						<ChannelItem key={channel.id} data={channel} />
					))}
					{data.channels.length === 0 && (
						<p
							className={'w-full text-xs text-tw-text-200 pl-2  mt-2 truncate'}
						>
							<i> No channels found in this group</i>
						</p>
					)}
				</AccordionItem>
			</Accordion>
		</>
	)
}
