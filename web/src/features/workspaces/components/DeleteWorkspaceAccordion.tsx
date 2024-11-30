'use client'
import { DeleteConfirmationModal } from '@/components/common'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { useCurrentWorkspace, useDeleteWorkspaceMutation } from '@/features/workspaces'

export const DeleteWorkspaceAccordion = () => {
	const workspace = useCurrentWorkspace()
	const { mutateAsync: deleteWorkspace} = useDeleteWorkspaceMutation()
	return (
		<>
			<Accordion isCompact>
				<AccordionItem
					classNames={{
						title: 'text-base',
						content: 'flex flex-col gap-4 items-start'
					}}
					title={'Delete workspace'}
				>
					<p className={'text-sm'}>
						Tread carefully here. You delete your workspace, you lose all your
						data, your members can’t access projects and pages, and we can’t
						retrieve any of it for you. Proceed only if you are sure you want
						your workspace deleted.
					</p>
					<DeleteConfirmationModal onConfirm={async () => deleteWorkspace(workspace.id)} type='workspace' name={workspace.name} >
						<Button
							color={'danger'}
							className={
								' rounded text-xs font-medium py-1.5 px-4  focus:bg-red-600 focus:text-red-200 bg-red-500 hover:bg-red-600 text-white'
							}
							size={'sm'}
							
						>
							Delete my workspace
						</Button>
					</DeleteConfirmationModal>
				</AccordionItem>
			</Accordion>
		</>
	)
}
