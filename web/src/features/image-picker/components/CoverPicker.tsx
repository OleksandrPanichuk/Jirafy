'use client'
import { useDisclosure } from '@/hooks'
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Tab,
	Tabs
} from '@nextui-org/react'
import { useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { UnsplashPicker } from './UnsplashPicker'

interface ICoverPickerProps extends Omit<ControllerRenderProps, 'value'> {}

export const CoverPicker = () => {
	const { isOpen, toggle, close } = useDisclosure()
	const [value, setValue] = useState<string | null>(null)

	return (
		<div className="flex flex-col gap-2 overflow-auto">
			{/* Current cover */}
			<div>{value}</div>
			<Popover
				isOpen={isOpen}
				onOpenChange={toggle}
				placement="bottom-end"
				classNames={{
					content: 'bg-tw-bg-100 rounded-md '
				}}
			>
				<PopoverTrigger>
					<Button
						className="w-min rounded-md bg-tw-bg-100 border-tw-border-300 border-[0.5px] px-2 py-0.5 hover:bg-tw-border-300"
						variant="bordered"
						size="sm"
					>
						Cover image
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[280px] sm:w-[400px] md:w-[640px]">
					<Tabs
						color="primary"
						size="sm"
						className="w-full"
						classNames={{
							tabContent: 'rounded-md',
							tabList: 'w-full flex',
							tab: 'w-min'
						}}
					>
						<Tab title="Unsplash" className="w-full" key="unsplash">
							<UnsplashPicker
								onChange={(url) => {
									setValue(url)
									close()
								}}
							/>
						</Tab>
						<Tab title="Upload" className="w-full" key="upload">
							Upload
						</Tab>
					</Tabs>
				</PopoverContent>
			</Popover>
		</div>
	)
}
