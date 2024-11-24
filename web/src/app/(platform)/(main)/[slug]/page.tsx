'use client'

import { Drawer, DrawerContent } from '@/components/ui'
import { WorkspaceSidebar } from '@/features/sidebars'
import { useCurrentWorkspace, useWorkspacesStore } from '@/features/workspaces'
import { useDisclosure } from '@/hooks'
import { Button } from '@nextui-org/react'
import { IconMenu2 } from '@tabler/icons-react'
import { notFound, useParams } from 'next/navigation'
import { useEffect } from 'react'

interface IParams {
	[key: string]: string
	slug: string
}

const Page = () => {
	const params = useParams<IParams>()
	const { isOpen, open, setIsOpen, close } = useDisclosure()

	const getWorkspace = useWorkspacesStore((s) => s.getWorkspaceBySlug)
	const currentWorkspace = useCurrentWorkspace()
	const selectWorkspace = useWorkspacesStore((s) => s.selectWorkspace)

	useEffect(() => {
		if (currentWorkspace?.slug !== params.slug) {
			selectWorkspace(params.slug)
		}
	}, [selectWorkspace, currentWorkspace?.slug, params.slug])

	if (!getWorkspace(params.slug)) {
		return notFound()
	}

	return (
		<div>
			<Button
				className="size-8"
				onPress={open}
				isIconOnly
				color="default"
				variant="flat"
			>
				<IconMenu2 />
			</Button>
			<Drawer className='max-w-[280px]' isOpen={isOpen} onClose={close} onOpenChange={setIsOpen}>
				<DrawerContent>
					<WorkspaceSidebar alwaysOpen />
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default Page
