import {
	WorkspaceSettingsHeader,
	WorkspaceSettingsNavigation
} from '@/features/workspaces'

import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className={'flex flex-col h-screen w-full overflow-x-hidden'}>
			<WorkspaceSettingsHeader />
			<main className={'overflow-y-auto w-full h-full flex gap-2 p-4'}>
				<WorkspaceSettingsNavigation />
				<div className={'w-full overflow-x-auto'}>{children}</div>
			</main>
		</div>
	)
}
