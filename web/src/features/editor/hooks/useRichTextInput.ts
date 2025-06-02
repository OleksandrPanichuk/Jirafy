'use client'
import { useChannelsStore } from '@/features/chat'
import {
	ChannelsMention,
	ChannelsMentionItem,
	ColorHighlighter,
	Link,
	Mention,
	QuickReactionShortcuts,
	ShikiCodeBlockComponent
} from '@/features/editor'
import { Highlight } from '@tiptap/extension-highlight'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { PluginKey } from '@tiptap/pm/state'
import { ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { CodeBlockShiki } from 'tiptap-extension-code-block-shiki'

export const useRichTextInput = () => {
	const channelsGroups = useChannelsStore((s) => s.channelsGroups)

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit.configure({
				codeBlock: false,
				code: {
					HTMLAttributes: {
						class:
							'border border-neutral-700 text-[#e8912d] bg-[#E8E8E80A] py-0.5 px-1 break-all rounded-sm block w-fit my-1 '
					}
				},
				blockquote: {
					HTMLAttributes: {
						class:
							'relative pl-4 my-3 before:absolute before:left-0 before:h-full before:w-[3px] before:bg-[#B9BABD] before:rounded-xl'
					}
				}
			}),
			Typography,
			Placeholder.configure({
				placeholder: 'Message #general'
			}),
			// SmilieReplacer,
			QuickReactionShortcuts,
			Highlight,
			ColorHighlighter,
			Underline,
			Subscript,
			Link,
			Superscript,
			CodeBlockShiki.extend({
				addNodeView() {
					// @ts-expect-error fucking tiptap types
					return ReactNodeViewRenderer(ShikiCodeBlockComponent)
				}
			}).configure({
				defaultTheme: 'github-dark-dimmed',
				defaultLanguage: 'tsx'
			}),
			ChannelsMention.configure({
				HTMLAttributes: {
					class: 'channels-mention'
				},
				suggestion: {
					char: '#',
					startOfLine: false,
					pluginKey: new PluginKey('channelsMentions'),
					items: ({ query }: { query: string }) => {
						const items = editor?.storage.channelsMention
							.items as ChannelsMentionItem[]

						if (!query.trim()) {
							return items
						}

						const normalizedQuery = query.toLowerCase().trim()
						return items.filter((item) =>
							item.label.toLowerCase().includes(normalizedQuery)
						)
					}
				}
			}),
			Mention.configure({
				HTMLAttributes: {
					class: 'mention'
				},
				suggestion: {
					char: '@',
					startOfLine: false,
					pluginKey: new PluginKey('userMentions'),
					items: ({ query }: { query: string }) => {
						const allItems = [
							{
								id: 'john_doe',
								label: 'johndoe',
								username: 'johndoe',
								fullName: 'John Doe',
								email: 'john.doe@example.com'
							},
							{
								id: 'jane_doe',
								label: 'janedoe',
								username: 'janedoe',
								fullName: 'Jane Doe',
								email: 'jane.doe@example.com'
							},
							{
								id: 'john_smith',
								label: 'johnsmith',
								username: 'johnsmith',
								fullName: 'John Smith',
								email: 'john.smith@example.com'
							},
							{
								id: 'jane_smith',
								label: 'janesmith',
								username: 'janesmith',
								fullName: 'Jane Smith',
								email: 'jane.smith@example.com'
							},
							{
								id: 'alice_johnson',
								label: 'alicej',
								username: 'alicej',
								fullName: 'Alice Johnson',
								email: 'alice.johnson@example.com'
							},
							{
								id: 'bob_wilson',
								label: 'bobw',
								username: 'bobw',
								fullName: 'Bob Wilson',
								email: 'bob.wilson@example.com'
							}
						]

						if (!query.trim()) {
							return allItems.slice(0, 5)
						}

						const normalizedQuery = query.toLowerCase().trim()
						const queryWords = normalizedQuery.split(/\s+/)

						return allItems
							.filter((item) => {
								const searchFields = [
									item.username,
									item.fullName || '',
									item.email || ''
								].map((field) => field.toLowerCase())

								return queryWords.every((word) =>
									searchFields.some((field) => field.includes(word))
								)
							})
							.sort((a, b) => {
								const aUsernameMatch = a.username
									.toLowerCase()
									.startsWith(normalizedQuery)
								const bUsernameMatch = b.username
									.toLowerCase()
									.startsWith(normalizedQuery)

								if (aUsernameMatch && !bUsernameMatch) return -1
								if (!aUsernameMatch && bUsernameMatch) return 1

								const aFullNameMatch = (a.fullName || '')
									.toLowerCase()
									.startsWith(normalizedQuery)
								const bFullNameMatch = (b.fullName || '')
									.toLowerCase()
									.startsWith(normalizedQuery)

								if (aFullNameMatch && !bFullNameMatch) return -1
								if (!aFullNameMatch && bFullNameMatch) return 1

								return a.username.localeCompare(b.username)
							})
							.slice(0, 5)
					}
				}
			})
		]
	})

	useEffect(() => {
		const channelsData = channelsGroups.flatMap((group) =>
			group.channels.map((channel) => ({
				id: channel.id,
				name: channel.name,
				groupName: group.name,
				type: channel.type
			}))
		) satisfies ChannelsMentionItem[]

		if (!editor) return

		editor.commands.setChannelsMentionItems(channelsData)
	}, [channelsGroups, editor])

	return editor
}
