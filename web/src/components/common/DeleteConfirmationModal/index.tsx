'use client'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input
} from '@/components/ui'
import { useChildrenWithProps, useDisclosure } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalContent } from '@nextui-org/react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { data } from './DeleteConfirmationModal.data'
import {
	FormValues,
	IDeleteConfirmationModalProps
} from './DeleteConfirmationModal.types'

export const DeleteConfirmationModal = ({
	onConfirm,
	type,
	onClose,
	onOpenChange,
	children,
	name
}: IDeleteConfirmationModalProps) => {
	const { isOpen, close, setIsOpen, open } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const title = data[type].title
	const description = data[type].description
	const nameInput = data[type].nameInput
	const phraseInput = data[type].phraseInput

	const form = useForm<FormValues>({
		mode: 'onChange',
		resolver: zodResolver(
			z.object({
				name: z.string().refine((value) => value === name),
				phrase: z.string().refine((value) => value === phraseInput.value)
			})
		),
		defaultValues: {
			name: '',
			phrase: ''
		}
	})

	const {
		control,
		handleSubmit,
		reset,
		formState: { isValid }
	} = form

	const handleCancel = () => {
		close()
		reset()
		onClose?.()
	}

	const handleConfirm = async () => {
		try {
			setIsLoading(true)
			await onConfirm?.()
		} finally {
			setIsLoading(false)
			close()
		}
	}
	const handleOpenChange = (isOpen: boolean) => {
		if (isLoading) {
			return
		}
		setIsOpen(isOpen)
		onOpenChange?.(isOpen)
	}

	const childrenWithHandler = useChildrenWithProps(children, { onClick: open })

	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} size="3xl" onOpenChange={handleOpenChange}>
				<ModalContent className="bg-tw-bg-100 flex flex-col gap-6 p-6">
					<div className="flex items-center gap-6">
						<div className="bg-red-500/20 p-4 rounded-full">
							<IconAlertTriangle className="size-6 text-red-600" />
						</div>
						<h2 className="2xl:text-2xl text-xl font-medium">{title}</h2>
					</div>
					<p className="text-sm leading-7 text-tw-text-200">
						{description['1']}
						<span className="break-words font-semibold">{name}</span>
						{description['2']}
					</p>
					<Form {...form}>
						<form
							className="flex flex-col gap-4"
							onSubmit={handleSubmit(handleConfirm)}
						>
							<FormField
								control={control}
								name={'name'}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-tw-text-200 font-normal">
											{nameInput.label}{' '}
											<span className="font-medium text-tw-text-100">
												{name}
											</span>{' '}
											to continue:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="text-tw-text-200"
												placeholder={nameInput.placeholder}
												disabled={isLoading}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name={'phrase'}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-tw-text-200 font-normal">
											To confirm, type{' '}
											<span className="font-medium text-tw-text-100">
												{phraseInput.label}
											</span>{' '}
											below:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="text-tw-text-200"
												placeholder={phraseInput.placeholder}
												disabled={isLoading}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex self-end gap-2">
								<Button
									isDisabled={isLoading}
									onPress={handleCancel}
									type="button"
									size="sm"
									variant="ghost"
								>
									Cancel
								</Button>
								<Button
									isDisabled={isLoading || !isValid}
									disabled={isLoading || !isValid}
									type="submit"
									size="sm"
									variant="danger"
								>
									Delete {type}
								</Button>
							</div>
						</form>
					</Form>
				</ModalContent>
			</Modal>
		</>
	)
}

