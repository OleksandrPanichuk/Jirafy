'use client'
import { ImagePicker, UnsplashPicker } from '@/features/images'
import { useDisclosure } from '@/hooks'
import { TypeFile } from '@/types'
import {
	Button,
	Modal,
	ModalContent,
	Skeleton,
	Tab,
	Tabs
} from '@nextui-org/react'
import { IconX } from '@tabler/icons-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ICoverPickerProps {
	value?: string | File
	text?: string
	onChange?: (url: string | File) => void
	onClose?: () => void
}

const DEFAULT_COVER_URL = '/default_cover.jpg'

export const CoverPicker = ({
	value: initialValue,
	text = 'Cover image',
	onChange
}: ICoverPickerProps) => {
	const { isOpen, toggle, close, open } = useDisclosure()
	const [value, setValue] = useState<TypeFile | File>(
		typeof initialValue === 'string'
			? {
					url: initialValue
				}
			: {
					url: DEFAULT_COVER_URL
				}
	)

	const [isLoadingCover, setIsLoadingCover] = useState(true)

	const handleUnsplashChange = (url: string) => {
		setValue({ url })
		onChange?.(url)
		close()
	}

	const handleFileChange = (file: File) => {
		setValue(file)
		onChange?.(file)
		close()
	}

	const url = value instanceof File ? URL.createObjectURL(value) : value.url

	useEffect(() => {
		if (initialValue && typeof initialValue === 'string') {
			setValue({ url: initialValue })
		}

		if (initialValue && initialValue instanceof File) {
			setValue(initialValue)
		}
	}, [initialValue])

	return (
		<div className="flex flex-col w-full overflow-auto relative">
			<div className="relative h-44">
				{isLoadingCover && (
					<Skeleton className="absolute inset-0 w-full h-full rounded-md" />
				)}
				<Image
					src={url}
					objectFit="cover"
					className="rounded-md"
					alt="cover-image"
					onLoadingComplete={() => setIsLoadingCover(false)}
					onLoadStart={() => setIsLoadingCover(true)}
					fill
				/>
			</div>
			<Button
				className="w-min rounded-md bg-tw-bg-100 border-tw-border-300 border-[0.5px] px-2 py-0.5 hover:bg-tw-border-300 min-w-0 h-6 absolute right-2 bottom-2"
				variant="bordered"
				size="sm"
				onClick={open}
			>
				{text}
			</Button>
			<Modal
				isOpen={isOpen}
				size="5xl"
				onOpenChange={toggle}
				placement="center"
				closeButton={
					<button>
						<IconX className="size-4" />
					</button>
				}
			>
				<ModalContent className=" bg-tw-bg-100 rounded-md max-h-[75vh] overflow-auto p-4">
					<Tabs
						color="primary"
						size="sm"
						className="w-full"
						classNames={{
							tabContent: 'rounded-md',
							tabList: 'w-full flex mr-4',
							tab: 'w-min'
						}}
					>
						<Tab title="Unsplash" key="unsplash">
							<UnsplashPicker onChange={handleUnsplashChange} />
						</Tab>
						<Tab title="Upload" key="upload">
							<ImagePicker
								onFileChange={handleFileChange}
								onCancel={close}
								value={value}
							/>
						</Tab>
					</Tabs>
				</ModalContent>
			</Modal>
		</div>
	)
}
