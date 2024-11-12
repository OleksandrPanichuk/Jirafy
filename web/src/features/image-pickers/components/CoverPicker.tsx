'use client'
import { useDisclosure } from '@/hooks'
import { TypeFile } from '@/types'
import { Button, Modal, ModalContent, Tab, Tabs } from '@nextui-org/react'
import { IconX } from '@tabler/icons-react'
import Image from 'next/image'
import { useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { FileUpload } from './FileUpload'
import { UnsplashPicker } from './UnsplashPicker'

interface ICoverPickerProps extends Omit<ControllerRenderProps, 'value'> {
	initialValue?: string
}
// Url to add, if initialValue is not provided
const DEFAULT_COVER_URL =
	'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NzMxMDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzE0NDkzMjR8&ixlib=rb-4.0.3&q=85'

export const CoverPicker = ({ initialValue }: ICoverPickerProps) => {
	const { isOpen, toggle, close, open } = useDisclosure()
	const [value, setValue] = useState<TypeFile | File>(
		initialValue
			? {
					url: initialValue
				}
			: {
					url: DEFAULT_COVER_URL
				}
	)

	const url = value instanceof File ? URL.createObjectURL(value) : value.url

	return (
		<div className="flex flex-col w-full overflow-auto relative">
			<div className="relative h-44">
				<Image
					src={url}
					objectFit="cover"
					className="rounded-md"
					alt="cover-image"
					fill
				/>
			</div>
			<Button
				className="w-min rounded-md bg-tw-bg-100 border-tw-border-300 border-[0.5px] px-2 py-0.5 hover:bg-tw-border-300 min-w-0 h-6 absolute right-2 bottom-2"
				variant="bordered"
				size="sm"
				onClick={open}
			>
				Cover image
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
							<UnsplashPicker
								onChange={(url) => {
									setValue({ url })
									close()
								}}
							/>
						</Tab>
						<Tab title="Upload" key="upload">
							<FileUpload
								onFileChange={(file) => {
									setValue(file)
									close()
								}}
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
