'use client'

import { CoverPicker, useGetRandomImageQuery } from '@/features/image-pickers'
import { NetworkSelect, useCreateProjectModalStore } from '@/features/projects'
import { Modal, ModalContent } from '@nextui-org/react'
import { IconX } from '@tabler/icons-react'
import { ProjectLeadSelect } from './ProjectLeadSelect'

export const CreateProjectModal = () => {
	const { isOpen, close } = useCreateProjectModalStore()

	const { data: initialImage } = useGetRandomImageQuery()

	if (!isOpen) return null

	return (
		<Modal
			size="2xl"
			placement="center"
			classNames={{
				wrapper: '!items-center'
			}}
			isOpen={isOpen}
			onClose={close}
			hideCloseButton
		>
			<ModalContent className="min-h-[50vh] bg-tw-bg-100 p-3 relative">
				<button onClick={close} className="absolute top-6 right-6 z-10">
					<IconX className="size-5 text-white" />
				</button>
				<div className="w-full flex">
					<CoverPicker
						initialValue={initialImage?.urls.full}
						name=""
						onBlur={() => {}}
						onChange={() => {}}
						ref={{} as any}
					/>
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
