import { ChannelType } from '@/types'
import { MentionNodeAttrs } from '@tiptap/extension-mention'
import { ReactRenderer } from '@tiptap/react'
import { SuggestionProps } from '@tiptap/suggestion'
import { Instance } from 'tippy.js'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		channelsMention: {
			setChannelsMentionItems: (items: ChannelsMentionItem[]) => ReturnType
		}
	}
}

export interface ChannelsMentionStorage {
	items?: ChannelsMentionItem[]
	_component: ReactRenderer | null
	_popup: Instance | null
	_lastProps: SuggestionProps<string, MentionNodeAttrs> | null
}

export interface ChannelsMentionItem {
	id: string
	name: string
	groupName: string
	type: ChannelType
}
