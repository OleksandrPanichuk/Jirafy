'use client'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from '@/features/shared'
import { PropsWithChildren } from 'react'
import { ConversationsSidebar } from '@/features/chat'

export const ConversationsLayout = ({ children }: PropsWithChildren) => {
	return (
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
				<ConversationsSidebar />
			</ResizablePanel>
			<ResizableHandle withHandle className="md:flex hidden" />
			<ResizablePanel minSize={20} defaultSize={80}>
				{children}
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
