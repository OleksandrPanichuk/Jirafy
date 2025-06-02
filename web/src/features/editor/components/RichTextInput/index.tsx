'use client'
import { EditorProvider, useRichTextInput } from '@/features/editor'

import { EmojiPicker } from '@/features/shared'
import { Button, Card, CardBody, Tooltip } from '@heroui/react'
import { IconClock, IconEdit, IconEye, IconSend } from '@tabler/icons-react'
import { EditorContent } from '@tiptap/react'
import { useCallback, useEffect, useState } from 'react'
import {
	AttachmentButton,
	AttachmentsPreview,
	useAttachments
} from './Attachments'
import { CharacterCounter } from './CharacterCounter'
import { DragAndDrop } from './DragAndDrop'
import { MessageScheduler } from './MessageScheduler'
import { QuickReactions } from './QuickReactions'
import { ReplyTo } from './ReplyTo'
import './styles.scss'
import { Toolbar } from './Toolbar'
import { VoiceMessage, VoiceRecorder } from './VoiceRecorder'

export const RichTextInput = () => {
	const editor = useRichTextInput()
	const [isEditorVisible, setIsEditorVisible] = useState(true)
	const [isSchedulerOpen, setIsSchedulerOpen] = useState(false)
	const [replyToMessage, setReplyToMessage] = useState<
		| {
				id: string
				content: string
				authorName: string
				timestamp: Date
		  }
		| undefined
	>(undefined)

	const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
		undefined
	)

	const { attachedFiles, handleFileUpload, removeFile, clearAll } =
		useAttachments()

	const handleEmojiSelect = (emoji: string) => {
		if (editor) {
			editor.chain().focus().insertContent(emoji).run()
		}
	}

	const handleVoiceMessage = (voiceMessage: VoiceMessage) => {
		// Send voice message independently without any existing content or attachments
		const voiceAttachment = {
			id: voiceMessage.id,
			file: new File([voiceMessage.blob], `voice-${voiceMessage.id}.webm`, {
				type: voiceMessage.blob.type
			}),
			type: 'voice' as const
		}

		// TODO: Implement actual voice message send logic here
		console.log('Sending voice message:', {
			content: '', // No text content for voice messages
			attachedFiles: [voiceAttachment], // Only the voice file
			mentions: [], // No mentions for voice messages
			replyTo: replyToMessage?.id,
			scheduledFor: undefined // Voice messages are sent immediately
		})

		// Clear only the reply state, keep other content intact
		setReplyToMessage(undefined)
	}

	const handleScheduleMessage = (date: Date) => {
		setScheduledDate(date)
		console.log('Message scheduled for:', date)
		// TODO: Implement message scheduling
	}

	const handleClearReply = () => {
		setReplyToMessage(undefined)
	}

	const handleSendMessage = useCallback(() => {
		if (!editor) return

		const content = editor.getHTML()
		const textContent = editor.getText().trim()

		if (!textContent && attachedFiles.length === 0) return

		const mentions: string[] = []
		const doc = editor.getJSON()

		const extractMentions = (node: Record<string, unknown>) => {
			if (
				node.type === 'mention' &&
				typeof node.attrs === 'object' &&
				node.attrs &&
				'id' in node.attrs
			) {
				const id = (node.attrs as { id?: string }).id
				if (typeof id === 'string') {
					mentions.push(id)
				}
			}
			if (Array.isArray(node.content)) {
				node.content.forEach((child) => {
					if (typeof child === 'object' && child !== null) {
						extractMentions(child as Record<string, unknown>)
					}
				})
			}
		}

		if (Array.isArray(doc.content)) {
			doc.content.forEach((node) => {
				if (typeof node === 'object' && node !== null) {
					extractMentions(node as Record<string, unknown>)
				}
			})
		}

		// TODO: Implement actual send logic here
		console.log('Sending message:', {
			content,
			attachedFiles,
			mentions,
			replyTo: replyToMessage?.id,
			scheduledFor: scheduledDate
		})

		setTimeout(() => {
			editor.commands.clearContent()
			clearAll()
			setReplyToMessage(undefined)
			setScheduledDate(undefined)
		}, 0)
	}, [clearAll, editor, attachedFiles, replyToMessage?.id, scheduledDate])

	useEffect(() => {
		const handleGlobalKeydown = (event: KeyboardEvent) => {
			if (
				event.key !== 'Enter' ||
				event.shiftKey ||
				event.ctrlKey ||
				event.altKey ||
				event.metaKey
			) {
				return
			}

			const activeElement = document.activeElement as HTMLElement
			const isInputFocused =
				activeElement &&
				(activeElement.tagName === 'INPUT' ||
					activeElement.tagName === 'TEXTAREA' ||
					activeElement.contentEditable === 'true' ||
					activeElement.getAttribute('role') === 'textbox')

			if (!isInputFocused) {
				event.preventDefault()
				handleSendMessage()
			}
		}

		document.addEventListener('keydown', handleGlobalKeydown)
		return () => document.removeEventListener('keydown', handleGlobalKeydown)
	}, [handleSendMessage])

	if (!editor) {
		return (
			<Card className="m-2">
				<CardBody className="p-3">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
						<span className="text-neutral-400 text-sm">Loading...</span>
					</div>
				</CardBody>
			</Card>
		)
	}

	return (
		<DragAndDrop
			onFilesAdded={(files: File[]) => {
				const attachedFiles = files.map((file) => {
					let type: 'image' | 'document' | 'other' = 'other'

					if (file.type.startsWith('image/')) {
						type = 'image'
					} else if (
						file.type.includes('pdf') ||
						file.type.includes('document') ||
						file.type.includes('text') ||
						file.type.includes('presentation')
					) {
						type = 'document'
					}

					return {
						id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
						file: file,
						type: type
					}
				})
				handleFileUpload(attachedFiles)
			}}
			accept="image/*,video/*,.pdf,.doc,.docx,.txt"
			maxFiles={10}
		>
			<EditorProvider editor={editor}>
				<Card className=" m-2">
					<CardBody className="p-0 ">
						<ReplyTo
							replyToMessage={replyToMessage}
							onClearReply={handleClearReply}
						/>

						<AttachmentsPreview
							attachedFiles={attachedFiles}
							onRemoveFile={removeFile}
						/>

						{isEditorVisible && (
							<div className="px-2 py-1 border-b border-neutral-700">
								<Toolbar />
							</div>
						)}

						<div className="relative">
							<div className="min-h-[40px] max-h-[120px] overflow-y-auto">
								<EditorContent
									editor={editor}
									className="px-3 py-2 text-neutral-100 text-sm focus:outline-none"
								/>
							</div>

							<div className="absolute bottom-2 right-2 flex gap-1">
								{scheduledDate && (
									<Tooltip
										content={`Scheduled for ${scheduledDate.toLocaleString()}`}
									>
										<Button
											isIconOnly
											size="sm"
											color="warning"
											variant="flat"
											className="h-6 w-6 min-w-6"
											onPress={() => setScheduledDate(undefined)}
										>
											<IconClock size={12} />
										</Button>
									</Tooltip>
								)}
								<Button
									isIconOnly
									size="sm"
									color="primary"
									variant="solid"
									className="h-6 w-6 min-w-6"
									onPress={handleSendMessage}
								>
									<IconSend size={12} />
								</Button>
							</div>
						</div>

						<div className="px-3 py-2 border-t border-neutral-700 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Tooltip
									content={isEditorVisible ? 'Hide toolbar' : 'Show toolbar'}
								>
									<Button
										isIconOnly
										size="sm"
										variant="ghost"
										color="default"
										onPress={() => setIsEditorVisible(!isEditorVisible)}
										className="h-6 w-6 min-w-6"
									>
										{isEditorVisible ? (
											<IconEye size={14} />
										) : (
											<IconEdit size={14} />
										)}
									</Button>
								</Tooltip>

								<AttachmentButton
									onFileUpload={handleFileUpload}
									attachedFiles={attachedFiles}
								/>

								<EmojiPicker variant="editor" onChange={handleEmojiSelect} />

								<QuickReactions onReactionSelect={handleEmojiSelect} />

								<VoiceRecorder
									onVoiceMessage={handleVoiceMessage}
									autoSend={true}
								/>

								<Tooltip content="Schedule message">
									<Button
										isIconOnly
										size="sm"
										variant="ghost"
										color="default"
										className="h-6 w-6 min-w-6"
										onPress={() => setIsSchedulerOpen(true)}
									>
										<IconClock size={14} />
									</Button>
								</Tooltip>
							</div>

							<div className="flex items-center gap-4">
								<CharacterCounter
									editor={editor}
									maxWords={500}
									showCharacterCount={false}
								/>

								{attachedFiles.length > 0 && (
									<span className="text-xs text-neutral-500">
										{attachedFiles.length} file
										{attachedFiles.length !== 1 ? 's' : ''} attached
									</span>
								)}
							</div>
						</div>
					</CardBody>
				</Card>

				<MessageScheduler
					isOpen={isSchedulerOpen}
					onClose={() => setIsSchedulerOpen(false)}
					onSchedule={handleScheduleMessage}
				/>
			</EditorProvider>
		</DragAndDrop>
	)
}
