import {
    Button,
    Card,
    CardBody,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tooltip,
} from '@heroui/react'
import { useRef, useState } from 'react'
import type { QuickReaction } from '../../types'

interface QuickReactionsProps {
    onReactionSelect: (emoji: string) => void
}

const quickReactions: QuickReaction[] = [
    { emoji: '👍', label: 'Thumbs Up', shortcut: ':+1: or :thumbsup:' },
    { emoji: '👎', label: 'Thumbs Down', shortcut: ':-1: or :thumbsdown:' },
    { emoji: '❤️', label: 'Heart', shortcut: ':heart:' },
    { emoji: '😂', label: 'Laugh', shortcut: ':joy: or :laughing:' },
    { emoji: '😮', label: 'Wow', shortcut: ':open_mouth: or :wow:' },
    { emoji: '😢', label: 'Sad', shortcut: ':cry: or :sad:' },
    { emoji: '😡', label: 'Angry', shortcut: ':rage: or :angry:' },
    { emoji: '🎉', label: 'Party', shortcut: ':tada: or :party:' },
]

export const QuickReactions = ({ onReactionSelect }: QuickReactionsProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)

    const handleReactionSelect = (emoji: string) => {
        onReactionSelect(emoji)
        setIsOpen(false)
    }

    return (
        <Popover
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            placement="top-start"
            showArrow
            backdrop="transparent"
            classNames={{
                base: 'max-w-none',
                content: 'p-0 border border-divider shadow-xl',
            }}
        >
            <PopoverTrigger>
                <Button
                    ref={triggerRef}
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    color="default"
                    className="h-6 w-6 min-w-6"
                    aria-label="Quick reactions"
                    title="Quick reactions"
                >
                    😊
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Card className="bg-content2 border-none shadow-none">
                    <CardBody className="p-2">
                        <div className="flex gap-1">
                            {quickReactions.map((reaction) => (
                                <Tooltip
                                    key={reaction.emoji}
                                    content={
                                        <div className="text-center">
                                            <div className="font-medium text-xs">
                                                {reaction.label}
                                            </div>
                                            {reaction.shortcut && (
                                                <div className="text-xs text-content2-foreground/70 mt-1">
                                                    {reaction.shortcut}
                                                </div>
                                            )}
                                        </div>
                                    }
                                    placement="top"
                                    delay={300}
                                    closeDelay={0}
                                    classNames={{
                                        content:
                                            'bg-content1 text-content1-foreground border border-divider',
                                    }}
                                >
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        radius="md"
                                        className="h-8 w-8 min-w-8 text-lg hover:bg-content3 transition-all duration-150 hover:scale-110"
                                        onPress={() =>
                                            handleReactionSelect(reaction.emoji)
                                        }
                                        aria-label={`React with ${reaction.label}`}
                                    >
                                        {reaction.emoji}
                                    </Button>
                                </Tooltip>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </PopoverContent>
        </Popover>
    )
}
