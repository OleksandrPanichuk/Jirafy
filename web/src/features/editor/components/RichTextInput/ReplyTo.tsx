"use client"
import { Button, Card, CardBody } from '@heroui/react'
import { IconX } from '@tabler/icons-react'

interface ReplyToProps {
    replyToMessage?: {
        id: string
        content: string
        authorName: string
        timestamp: Date
    }
    onClearReply: () => void
}

export const ReplyTo = ({ replyToMessage, onClearReply }: ReplyToProps) => {
    if (!replyToMessage) return null

    const truncateContent = (content: string, maxLength: number = 100) => {
        const plainText = content.replace(/<[^>]*>/g, '')
        if (plainText.length <= maxLength) return plainText
        return plainText.substring(0, maxLength) + '...'
    }

    return (
        <Card className="m-2">
            <CardBody className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-0.5 h-6 bg-primary rounded-full"></div>
                            <span className="text-xs text-primary font-medium">
                                Replying to {replyToMessage.authorName}
                            </span>
                        </div>
                        <div className="pl-3">
                            <p className="text-sm text-content2-foreground/80 truncate">
                                {truncateContent(replyToMessage.content)}
                            </p>
                        </div>
                    </div>

                    <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="h-5 w-5 min-w-5 shrink-0"
                        onPress={onClearReply}
                    >
                        <IconX size={12} />
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}
