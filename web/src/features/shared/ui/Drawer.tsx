'use client'
import { cn } from '@/lib'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalProps
} from '@heroui/react'

type Props = Omit<
	ModalProps,
	'fullScreen' | 'closeButton' | 'animated' | 'blur' | 'placement'
>

export const Drawer = ({ children, className, ...props }: Props) => {
	const { isOpen } = props

	return (
		<Modal
			className={cn(
				`fixed top-0 left-0 transition-transform  bottom-0 max-w-[500px] max-h-full rounded-none m-0 transform ${
					isOpen
						? 'translate-x-0  duration-300'
						: '-translate-x-full duration-200'
				}`,
				className
			)}
			disableAnimation
			placement="top"
			hideCloseButton
			size="full"
			{...props}
		>
			{children}
		</Modal>
	)
}

export const DrawerContent = ModalContent
export const DrawerHeader = ModalHeader
export const DrawerBody = ModalBody
export const DrawerFooter = ModalFooter
