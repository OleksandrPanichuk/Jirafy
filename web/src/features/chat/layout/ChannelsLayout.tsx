import { getAllChannels } from '@/api'
import {
	ChannelsGroupModal,
	ChannelsModal,
	ChannelsProvider,
	ChannelsSidebar
} from '@/features/chat'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from '@/features/shared'
import { PropsWithChildren } from 'react'

interface ILayoutProps extends PropsWithChildren {
	params: Promise<{
		slug: string
	}>
}

export const ChannelsLayout = async ({ children, params }: ILayoutProps) => {
	const { slug } = await params
	const channels = await getAllChannels(slug)

	if (!channels.length) {
		return <>No Channels found</>
	}

	return (
		<ChannelsProvider initialData={channels}>
			<ChannelsGroupModal />
			<ChannelsModal />
			<ResizablePanelGroup
				direction="horizontal"
				autoSaveId="ca-workspace-layout"
			>
				<ResizablePanel
					defaultSize={20}
					minSize={11}
					maxSize={30}
					className="bg-neutral-900/50 md:flex hidden"
				>
					<ChannelsSidebar />
				</ResizablePanel>
				<ResizableHandle
					withHandle
					className="md:flex hidden bg-neutral-900/50"
				/>
				<ResizablePanel minSize={20} defaultSize={80}>
					{children}
				</ResizablePanel>
			</ResizablePanelGroup>
		</ChannelsProvider>
	)
}
