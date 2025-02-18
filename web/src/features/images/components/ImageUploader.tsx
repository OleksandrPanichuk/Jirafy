'use client'

import { IMAGE_MIME_TYPES } from '@/constants'
import { ImageCropper } from '@/features/images'
import { Button } from '@/features/shared'
import {
	useDeleteFileMutation,
	useUploadFileMutation
} from '@/features/storage'
import { useChildrenWithProps, useConfirm, useDisclosure } from '@/hooks'
import { cn } from '@/lib'
import { TypeFile } from '@/types'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import { IconUserCircle } from '@tabler/icons-react'
import { PropsWithChildren, useRef, useState } from 'react'
import Dropzone, { DropzoneRef } from 'react-dropzone'

interface IImageUploaderProps extends PropsWithChildren {
	onUpload?: (image: TypeFile) => void | Promise<void>
	onRemove?: () => void | Promise<void>
	value?: TypeFile | null
}

export const ImageUploader = ({
	children,
	onUpload,
	onRemove,
	value
}: IImageUploaderProps) => {
	const { isOpen, setIsOpen, open, close } = useDisclosure()

	const [isPending, setIsPending] = useState<boolean>(false)
	const [cropped, setCropped] = useState<File | null>(null)
	const [file, setFile] = useState<File | null>(null)

	const dropzoneRef = useRef<DropzoneRef | null>(null)

	const { mutateAsync: uploadFile, data } = useUploadFileMutation()
	const { mutateAsync: deleteFile } = useDeleteFileMutation()

	const [ConfirmationModal, confirm] = useConfirm()

	const handleDrop = (acceptedFiles: File[]) => {
		const file = acceptedFiles[0]

		if (file) {
			setFile(file)
			setCropped(file)
		}
	}

	const handleEdit = () => {
		dropzoneRef.current?.open()
	}

	const handleClose = () => {
		setFile(null)
		setCropped(null)
		close()
	}

	const handleCropComplete = (cropped: File) => {
		setCropped(cropped)
	}
	const handleCropRemove = () => {
		setCropped(file)
	}

	const handleUpload = async () => {
		if (!cropped) {
			return
		}

		try {
			setIsPending(true)
			const { data } = await uploadFile(cropped)

			await onUpload?.(data)
		} finally {
			setIsPending(false)
			handleClose()
		}
	}

	const handleRemove = async () => {
		const ok = await confirm()

		if (!ok || !value?.key) {
			return
		}

		try {
			setIsPending(true)
			await deleteFile(value.key.split('/')[1])

			await onRemove?.()
		} finally {
			setIsPending(false)
			handleClose()
		}
	}

	const handleOpenChange = (isOpen: boolean) => {
		setIsOpen(isOpen)
		if (!isOpen) {
			setFile(null)
			setCropped(null)
		}
	}

	const childrenWithHandler = useChildrenWithProps(children, {
		onClick: () => {
			open()
		}
	})

	return (
		<>
			{childrenWithHandler}
			<ConfirmationModal />
			<Modal
				size="2xl"
				placement={'center'}
				isOpen={isOpen}
				onOpenChange={handleOpenChange}
			>
				<ModalContent className="bg-tw-bg-100">
					<ModalHeader>
						<h2>Upload image</h2>
					</ModalHeader>
					<ModalBody className="items-center">
						<div className=" relative max-w-[20rem] w-full">
							{(cropped || value) && (
								<div className="absolute z-10 flex gap-1 right-0 top-0 translate-y-[-50%] translate-x-[20%]">
									<ImageCropper
										src={cropped ? URL.createObjectURL(cropped) : value!.url}
										onCropComplete={handleCropComplete}
										onCropRemove={handleCropRemove}
									>
										<Button
											size="sm"
											className="min-w-0 h-6 !text-xs rounded-md bg-tw-bg-100 "
											variant={'ghost'}
											onClick={handleEdit}
											isDisabled={isPending}
										>
											Crop
										</Button>
									</ImageCropper>
									<Button
										size="sm"
										className="min-w-0 h-6 !text-xs rounded-md bg-tw-bg-100 "
										onClick={handleEdit}
										isDisabled={isPending}
										variant={'ghost'}
									>
										Edit
									</Button>
								</div>
							)}
							<Dropzone
								maxFiles={1}
								multiple={false}
								maxSize={10 * 1024 * 1024}
								accept={{
									'image/*': IMAGE_MIME_TYPES
								}}
								ref={dropzoneRef}
								onDrop={handleDrop}
								disabled={isPending}
							>
								{({ getRootProps, getInputProps }) => (
									<div
										{...getRootProps()}
										className={cn(
											'overflow-auto aspect-square',
											cropped || value
												? 'relative'
												: ' border-dashed border-tw-border-400 border-2 bg-transparent p-4 flex items-center justify-center text-tw-text-350 text-sm'
										)}
									>
										<input {...getInputProps()} />
										{cropped || value ? (
											<img
												src={
													cropped ? URL.createObjectURL(cropped) : value!.url
												}
												alt={'preview'}
												className={'w-full object-cover aspect-square'}
											/>
										) : (
											<div className="flex flex-col gap-2 items-center">
												<IconUserCircle className={'size-16'} />
												<p>Drag &apos;n&apos; drop image here</p>
											</div>
										)}
									</div>
								)}
							</Dropzone>
						</div>
						<p className="self-start text-sm text-tw-text-350">
							File formats supported —{' '}
							{IMAGE_MIME_TYPES.map((format) => `${format}, `)}
						</p>
					</ModalBody>
					<ModalFooter className="justify-between">
						<Button
							onPress={handleRemove}
							size="sm"
							variant="danger"
							isDisabled={!data || isPending}
						>
							Remove
						</Button>
						<div className="space-x-2">
							<Button
								size="sm"
								variant={'ghost'}
								onPress={handleClose}
								isDisabled={isPending}
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								size="sm"
								className="rounded"
								onPress={handleUpload}
								isDisabled={!cropped || isPending}
							>
								Upload & Save
							</Button>
						</div>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
