'use client'
import { useDisclosure } from '@/hooks'
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@nextui-org/react'
import Picker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { useState } from 'react'

interface IEmojiPickerProps {
	onChange?: (emoji: string) => void
	value?: string
}

// TODO: test open state

export const EmojiPicker = ({ onChange, value }: IEmojiPickerProps) => {
	const [emoji, setEmoji] = useState(value ?? '🙂')
	const {isOpen, close, toggle} = useDisclosure()

	const handleSelect = (data: EmojiClickData) => {
		setEmoji(data.emoji)
		onChange?.(data.emoji)
		close()
	}

	return (
		<Popover onClose={close} onOpenChange={toggle}>
			<PopoverTrigger>
				<Button className="text-lg bg-tw-bg-80" isIconOnly>
					{emoji}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0  max-h-[21.875rem]">
				<Picker
					theme={Theme.DARK}
					className="!w-[17.5rem] xs:!w-[21.875rem]"
					onEmojiClick={handleSelect}
				/>
			</PopoverContent>
		</Popover>
	)
}
