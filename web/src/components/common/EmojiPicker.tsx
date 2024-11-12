'use client'
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

export const EmojiPicker = ({ onChange, value }: IEmojiPickerProps) => {
	const [emoji, setEmoji] = useState(value ?? '🙂')

	const handleSelect = (data: EmojiClickData) => {
		setEmoji(data.emoji)
		onChange?.(data.emoji)
	}

	return (
		<Popover>
			<PopoverTrigger>
				<Button className="text-lg" isIconOnly>
					{emoji}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Picker theme={Theme.DARK} onEmojiClick={handleSelect} />
			</PopoverContent>
		</Popover>
	)
}
