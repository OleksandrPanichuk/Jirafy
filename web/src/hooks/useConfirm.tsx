'use client'

import { Button } from '@/features/shared'
import {
	Modal,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import { useState } from 'react'

interface IUseConfirmProps {
	title?: string
	message?: string
}

export const useConfirm = ({
	title = 'Are you absolutely sure?',
	message = 'This action cannot be undone'
}: IUseConfirmProps = {}): [() => JSX.Element, () => Promise<boolean>] => {
	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void
	} | null>(null)

	const confirm = () =>
		new Promise((resolve) => {
			setPromise({ resolve })
		})

	const handleClose = () => {
		setPromise(null)
	}

	const handleConfirm = () => {
		promise?.resolve(true)
		handleClose()
	}

	const handleCancel = () => {
		promise?.resolve(false)
		handleClose()
	}

	const ConfirmationDialog = () => (
		<Modal
			placement="center"
			isOpen={promise !== null}
			onOpenChange={handleCancel}
			hideCloseButton
		>
			<ModalContent className="bg-tw-bg-100">
				<ModalHeader className="flex flex-col">
					<h3 className="text-lg font-semibold leading-6 mb:-my-5">{title}</h3>
					<p className="text-sm tracking-tight text-left font-normal text-zinc-300">
						{message}
					</p>
				</ModalHeader>
				<ModalFooter>
					<Button variant={'ghost'} onClick={handleCancel} size="sm">
						Cancel
					</Button>
					<Button onClick={handleConfirm} variant="danger" size="sm">
						Confirm
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)

	return [ConfirmationDialog, confirm as () => Promise<boolean>]
}
