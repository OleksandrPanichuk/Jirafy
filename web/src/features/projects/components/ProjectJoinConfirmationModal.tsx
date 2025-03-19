'use client'

import { Button } from '@/features/shared'
import { useChildrenWithProps, useDisclosure } from '@/hooks'
import { Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/react'
import { PropsWithChildren } from 'react'
import { useJoinProjectMutation } from '../api'

interface IProjectJoinConfirmationModalProps extends PropsWithChildren {
	projectId: string
	name: string
}

export const ProjectJoinConfirmationModal = ({
	projectId,
	name,
	children
}: IProjectJoinConfirmationModalProps) => {
	const { open, isOpen, toggle, close } = useDisclosure()
	const childrenWithHandler = useChildrenWithProps(children, {
		onClick: open
	})
	const { mutate: joinProject, isPending } = useJoinProjectMutation()
	const handleAccept = () => {
		joinProject(
			{ projectId },
			{
				onSuccess: close
			}
		)
	}
	return (
		<>
			{childrenWithHandler}
			<Modal
				isOpen={isOpen}
				onOpenChange={toggle}
				placement="center"
				size="xl"
				hideCloseButton
			>
				<ModalContent className="rounded p-6">
					<ModalBody className="p-0">
						<h3 className="text-lg font-medium leading-6 text-tw-text-100">
							Join Project?
						</h3>
						<p>
							Are you sure you want to join the project{' '}
							<span className="font-semibold break-words">{name}</span>? Please
							click the &apos;Join Project&apos; button below to continue.
						</p>
					</ModalBody>
					<ModalFooter className="p-0 mt-5">
						<Button
							isDisabled={isPending}
							onPress={close}
							variant={'ghost'}
							size="sm"
						>
							Cancel
						</Button>
						<Button
							isDisabled={isPending}
							onPress={handleAccept}
							variant={'primary'}
							size="sm"
						>
							Join Project
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
