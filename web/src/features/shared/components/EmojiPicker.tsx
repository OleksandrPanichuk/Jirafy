'use client'
import { useDisclosure } from '@/hooks'
import { cn } from '@/lib'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import Picker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { useState } from 'react'

interface IEmojiPickerProps {
	onChange?: (emoji: string) => void
	value?: string
	variant?: 'default' | 'editor'
}

// TODO: test open state

export const EmojiPicker = ({
	onChange,
	value,
	variant = 'default'
}: IEmojiPickerProps) => {
	const [emoji, setEmoji] = useState(value ?? '🙂')
	const { isOpen, close, toggle } = useDisclosure()

	const handleSelect = (data: EmojiClickData) => {
		setEmoji(data.emoji)
		onChange?.(data.emoji)
		close()
	}

	return (
		<Popover isOpen={isOpen} onClose={close} onOpenChange={toggle}>
			<PopoverTrigger>
				<Button
					className={cn(
						variant === 'default'
							? 'text-lg bg-tw-bg-80'
							: 'h-6 w-6 min-w-6 text-sm'
					)}
					size={variant === 'default' ? 'md' : 'sm'}
					variant={variant === 'editor' ? 'ghost' : undefined}
					color={variant === 'editor' ? 'default' : undefined}
					isIconOnly
				>
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
