import { PropsWithChildren } from "react"

export type ModalType = 'project' | 'workspace'

export type FormValues = {
	name: string
	phrase: string
}

export type TypeData = {
	title: string
	description: {
		1: string
		2: string
	}
	nameInput: {
		label: string
		placeholder: string
	}
	phraseInput: {
		label: string
		placeholder: string
		value: string
	}
}

export interface IDeleteConfirmationModalProps extends PropsWithChildren {
	onClose?: () => void
	onConfirm?: () => unknown | Promise<unknown>
	onOpenChange?: (isOpen: boolean) => void
	name: string
	type: ModalType
}
