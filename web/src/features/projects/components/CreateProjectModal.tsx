'use client'

import { useCreateProjectModalStore } from '@/features/projects'
import { Modal, ModalContent } from '@nextui-org/react'
import { ProjectLeadSelect } from './ProjectLeadSelect'

export const CreateProjectModal = () => {
	const { isOpen, close } = useCreateProjectModalStore()

	if (!isOpen) return null

	return (
		<Modal size="3xl" isOpen={isOpen} onClose={close}>
			<ModalContent className="min-h-[50vh] bg-tw-bg-100">
				<div>Content here</div>
				<ProjectLeadSelect
					name="name"
					onBlur={() => {}}
					onChange={() => {}}
					value=""
					ref={{} as any}
				/>
			</ModalContent>
		</Modal>
	)
}
