export interface ChatMessage {
    id: string
    content: string
    plainText: string
    mentions: string[]
    attachments: File[]
    replyTo?: string
    scheduledFor?: Date
    timestamp: Date
    authorId: string
}

export interface MessageDraft {
    content: string
    attachments: File[]
    replyTo?: string
    lastUpdated: Date
}

export interface SlashCommand {
    command: string
    description: string
    icon?: string
    action: (editor: import('@tiptap/react').Editor, args?: string) => void
}

export interface QuickReaction {
    emoji: string
    label: string
    shortcut?: string
}

export interface ChannelMention {
    id: string
    name: string
    description?: string
    isPrivate?: boolean
}

export interface LinkPreview {
    url: string
    title?: string
    description?: string
    image?: string
    siteName?: string
}
