import {
	MentionNodeAttrs,
	Mention as TiptapMention
} from '@tiptap/extension-mention'
import { PluginKey } from '@tiptap/pm/state'
import { ReactRenderer } from '@tiptap/react'
import Suggestion, { SuggestionProps } from '@tiptap/suggestion'
import tippy, { Instance } from 'tippy.js'
import { ChannelsMentionList } from './ChannelsMentionList'
import { ChannelsMentionItem, ChannelsMentionStorage } from './types'

interface MentionListRef {
	onKeyDown: ({ event }: { event: KeyboardEvent }) => boolean
}

export const ChannelsMention = TiptapMention.extend({
	name: 'channelsMention',

	addStorage: () => {
		return {
			items: [] as ChannelsMentionItem[],
			_component: null as ReactRenderer | null,
			_popup: null as Instance | null,
			_lastProps: null as SuggestionProps<string, MentionNodeAttrs> | null
		}
	},
	addAttributes() {
		return {
			...this.parent?.(),
			_component: null as ReactRenderer | null,
			_popup: null as Instance | null,
			_lastProps: null as SuggestionProps<string, MentionNodeAttrs> | null
		}
	},
	addCommands() {
		return {
			setChannelsMentionItems:
				(items: ChannelsMentionItem[]) =>
				({ editor }) => {
					const storage = editor.storage
						.channelsMention as ChannelsMentionStorage

					if (!storage) {
						console.error('ChannelsMention storage not found in command')
						return false
					}

					storage.items = items

					if (storage._component && storage._lastProps) {
						storage._component.updateProps(storage._lastProps)
					}

					return true
				}
		}
	},

	addProseMirrorPlugins() {
		return [
			Suggestion({
				editor: this.editor,
				pluginKey: new PluginKey('channelsMentions'),
				...this.options.suggestion,
				render: () => {
					let component: ReactRenderer
					let popup: Instance

					return {
						onStart: (props: SuggestionProps<string, MentionNodeAttrs>) => {
							const storage = this.editor.storage
								.channelsMention as ChannelsMentionStorage

							if (!storage) {
								return
							}

							storage._lastProps = props

							component = new ReactRenderer(ChannelsMentionList, {
								editor: props.editor,
								props
							})

							storage._component = component

							if (!props.clientRect) return

							popup = tippy('body', {
								getReferenceClientRect: () => {
									const rect = props.clientRect?.()
									if (!rect) return new DOMRect()
									return rect
								},
								appendTo: () => document.body,
								content: component.element,
								showOnCreate: true,
								interactive: true,
								trigger: 'manual',
								placement: 'top-start',
								maxWidth: 400,
								offset: [0, 8],
							})[0]
							storage._popup = popup
						},
						onUpdate: (props: SuggestionProps<string, MentionNodeAttrs>) => {
							const storage = this.editor.storage
								.channelsMention as ChannelsMentionStorage
							if (!storage) return

							storage._lastProps = props
							component.updateProps(props)
							if (props.clientRect) {
								storage._popup?.setProps({
									getReferenceClientRect: () =>
										props.clientRect?.() || new DOMRect()
								})
							}
						},
						onKeyDown: ({ event }) => {
							const storage = this.editor.storage
								.channelsMention as ChannelsMentionStorage
							if (!storage) return false

							if (event.key === 'Escape') {
								storage._popup?.hide()
								return true
							}
							return (
								(storage._component?.ref as MentionListRef)?.onKeyDown?.({
									event
								}) || false
							)
						},
						onExit: () => {
							const storage = this.editor.storage
								.channelsMention as ChannelsMentionStorage
							if (!storage) return

							storage._popup?.destroy()
							component.destroy()

							// Clean up references - use the same storage reference
							storage._component = null
							storage._popup = null
							storage._lastProps = null
						}
					}
				}
			})
		]
	}
})

export type * from './types'
