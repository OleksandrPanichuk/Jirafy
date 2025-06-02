'use client'
import { ChannelType } from '@/types'
import { Card } from '@heroui/react'
import { IconHash, IconMicrophone } from '@tabler/icons-react'
import { MentionNodeAttrs } from '@tiptap/extension-mention'
import { SuggestionProps } from '@tiptap/suggestion'
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState
} from 'react'
import { ChannelsMentionItem } from './types'

export const ChannelsMentionList = forwardRef(
	(props: SuggestionProps<string, MentionNodeAttrs>, ref) => {
		const [selectedIndex, setSelectedIndex] = useState(0)

		const itemsFromStorage = useMemo(
			() =>
				props.editor.storage?.channelsMention?.items as ChannelsMentionItem[],
			[props.editor.storage?.channelsMention?.items]
		)

		const items = useMemo(
			() =>
				itemsFromStorage.length > 0
					? itemsFromStorage
					: (props.items as unknown as ChannelsMentionItem[]) || [],
			[itemsFromStorage, props.items]
		)

		const groupedItems = useMemo(() => {
			const groups = new Map<string, ChannelsMentionItem[]>()

			items.forEach((item) => {
				if (!groups.has(item.groupName)) {
					groups.set(item.groupName, [])
				}
				groups.get(item.groupName)!.push(item)
			})

			return Array.from(groups.entries()).map(([groupName, channels]) => ({
				groupName,
				channels
			}))
		}, [items])
		const allItems = useMemo(() => {
			return groupedItems.flatMap((group) => group.channels)
		}, [groupedItems])

		const selectItem = (index: number) => {
			const item = allItems[index]

			if (item) {
				props.command({ id: item.name })
			}
		}

		const upHandler = () => {
			setSelectedIndex((selectedIndex + allItems.length - 1) % allItems.length)
		}

		const downHandler = () => {
			setSelectedIndex((selectedIndex + 1) % allItems.length)
		}

		const enterHandler = () => {
			selectItem(selectedIndex)
		}

		useEffect(() => setSelectedIndex(0), [allItems])

		useImperativeHandle(ref, () => ({
			onKeyDown: ({ event }: { event: KeyboardEvent }) => {
				if (event.key === 'ArrowUp') {
					upHandler()
					return true
				}

				if (event.key === 'ArrowDown') {
					downHandler()
					return true
				}

				if (event.key === 'Enter') {
					enterHandler()
					return true
				}
				return false
			}
		}))

		return (
			<Card
				className="max-h-80 min-w-72 max-w-80 shadow-xl backdrop-blur-sm border border-divider bg-content2"
				shadow="lg"
			>
				<div className="p-0 overflow-auto no-scroll">
					{allItems.length > 0 ? (
						<div>
							{groupedItems.map((group, groupIndex) => (
								<div key={group.groupName}>
									{/* Group Header */}
									<div className="px-3 py-1.5 bg-content1/50 border-b border-divider/30 sticky top-0 z-10">
										<span className="text-xs font-medium text-content1-foreground/60 uppercase tracking-wider">
											{group.groupName}
										</span>
									</div>

									{/* Channels in this group */}
									<div className="pb-1">
										{group.channels.map((item) => {
											const globalIndex = allItems.findIndex(
												(globalItem) => globalItem.id === item.id
											)
											return (
												<div
													key={item.id}
													className={`
														px-3 py-2 mx-1 my-0.5 rounded-md cursor-pointer transition-all duration-150 ease-out
														${
															globalIndex === selectedIndex
																? 'bg-primary-100 text-primary-900 shadow-sm'
																: 'text-content2-foreground hover:bg-content3/50'
														}
														focus:outline-none focus:bg-primary-100 focus:text-primary-900
														active:bg-primary-200
													`.trim()}
													onClick={() => selectItem(globalIndex)}
													onMouseEnter={() => setSelectedIndex(globalIndex)}
												>
													{' '}
													<div className="flex items-center">
														<div
															className={`
																w-5 h-5 rounded flex items-center justify-center text-xs font-medium mr-2.5
																${
																	globalIndex === selectedIndex
																		? 'bg-primary-500 text-white'
																		: 'bg-content3/60 text-content3-foreground/80'
																}
															`.trim()}
														>
															{item.type === ChannelType.TEXT ? (
																<IconHash className="w-3 h-3" />
															) : (
																<IconMicrophone className="w-3 h-3" />
															)}
														</div>
														<div className="flex flex-col">
															<span className="font-medium text-sm">
																{item.name}
															</span>
														</div>
													</div>
												</div>
											)
										})}
									</div>

									{/* Add spacing between groups except for the last one */}
									{groupIndex < groupedItems.length - 1 && (
										<div className="h-1 bg-divider/20"></div>
									)}
								</div>
							))}
						</div>
					) : (
						<div className="flex items-center justify-center py-6 px-3 text-content2-foreground">
							<span className="text-sm">No channels found</span>
						</div>
					)}
				</div>
			</Card>
		)
	}
)

ChannelsMentionList.displayName = 'ChannelsMentionList'
