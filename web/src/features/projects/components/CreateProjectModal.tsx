'use client'

import { NetworkSelect, useCreateProjectModalStore } from '@/features/projects'
import { Modal, ModalContent } from '@nextui-org/react'
import { ProjectLeadSelect } from './ProjectLeadSelect'
import { CoverPicker } from '@/features/image-picker'

export const CreateProjectModal = () => {
	const { isOpen, close } = useCreateProjectModalStore()

	if (!isOpen) return null

	return (
		<Modal size="3xl" isOpen={isOpen} onClose={close}>
			<ModalContent className="min-h-[50vh] bg-tw-bg-100">
				<div>Content here</div>
				<div className="w-full flex justify-end">
					<CoverPicker />
				</div>
				<NetworkSelect
					name="name"
					onBlur={() => {}}
					onChange={() => {}}
					value=""
					ref={{} as any}
				/>
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
