'use client'
import { useChildrenWithProps, useDisclosure } from '@/hooks'
import { Modal, ModalContent } from '@nextui-org/react'
import { PropsWithChildren, useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'

import { Button } from '@/components/ui'

import 'react-image-crop/dist/ReactCrop.css'

interface IImageCropperProps extends PropsWithChildren {
	src: string
	onCropComplete?: (file: File) => void
	onCropRemove?: () => void
}

export const ImageCropper = ({
	src,
	onCropComplete,
	onCropRemove,
	children
}: IImageCropperProps) => {
	const { isOpen, open, setIsOpen, close } = useDisclosure()
	const [crop, setCrop] = useState<Crop | null>()
	const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
	const imageRef = useRef<HTMLImageElement | null>(null)

	const handleImageLoaded = (image: HTMLImageElement) => {
		imageRef.current = image
	}

	const handleCropComplete = (crop: PixelCrop) => {
		setCompletedCrop(crop)
	}

	const handleCropRemove = () => {
		setCompletedCrop(null)
		setCrop(null)
		onCropRemove?.()
		close()
	}

	const handleCrop = () => {
		if (!completedCrop || !imageRef.current) return

		const canvas = document.createElement('canvas')
		const scaleX = imageRef.current.naturalWidth / imageRef.current.width
		const scaleY = imageRef.current.naturalHeight / imageRef.current.height
		const ctx = canvas.getContext('2d')

		if (!ctx) return

		canvas.width = completedCrop.width
		canvas.height = completedCrop.height

		ctx.drawImage(
			imageRef.current,
			completedCrop.x * scaleX,
			completedCrop.y * scaleY,
			completedCrop.width * scaleX,
			completedCrop.height * scaleY,
			0,
			0,
			completedCrop.width,
			completedCrop.height
		)

		canvas.toBlob(
			(blob) => {
				if (blob) {
					onCropComplete?.(
						new File([blob], 'image.jpeg', { type: 'image/jpeg' })
					)
					close()
				}
			},
			'image/jpeg',
			1
		)
	}

	const childrenWithHandler = useChildrenWithProps(children, {
		onClick: open
	})

	return (
		<>
			{childrenWithHandler}
			<Modal
				isOpen={isOpen}
				placement={'center'}
				onOpenChange={setIsOpen}
				hideCloseButton
			>
				<ModalContent className="bg-tw-bg-100">
					<div className="flex flex-col max-h-[90vh] overflow-y-auto">
						<ReactCrop
							crop={crop ?? ({} as Crop)}
							onChange={(newCrop) => setCrop(newCrop)}
							onComplete={handleCropComplete}
							aspect={1}
						>
							<img
								src={src}
								alt="Crop"
								className="w-full"
								crossOrigin={''}
								onLoad={(e) => handleImageLoaded(e.target as HTMLImageElement)}
							/>
						</ReactCrop>
						<div className="flex justify-between px-4 py-3">
							<Button
								variant={'danger'}
								isDisabled={!crop}
								size="sm"
								onClick={handleCropRemove}
							>
								Remove crop
							</Button>
							<Button variant="primary" size="sm" onClick={handleCrop}>
								Crop
							</Button>
						</div>
					</div>
				</ModalContent>
			</Modal>
		</>
	)
}
