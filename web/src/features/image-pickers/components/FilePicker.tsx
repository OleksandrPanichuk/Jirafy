'use client'

import { cn } from '@/lib'
import { TypeFile } from '@/types'
import { Button } from '@nextui-org/react'
import { useRef, useState } from 'react'
import Dropzone, { DropzoneRef } from 'react-dropzone'

interface IFilePickerProps {
	onFileChange?: (file: File) => void
	onCancel?: () => void
	value?: TypeFile | File | null
	disabled?: boolean
	name?: string
}

const ImageMimeTypes = ['.jpg', '.webp', '.png', '.jpeg']

export const FilePicker = ({
	onFileChange,
	onCancel,
	value,
	name,
	disabled
}: IFilePickerProps) => {
	const [url, setUrl] = useState<string | null>(
		value instanceof File ? URL.createObjectURL(value) : value?.url || null
	)
	const [file, setFile] = useState<File | null>(
		value instanceof File ? value : null
	)

	const dropzoneRef = useRef<DropzoneRef | null>(null)

	const handleDrop = (acceptedFiles: File[]) => {
		const file = acceptedFiles[0]

		if (file) {
			setFile(file)
			setUrl(URL.createObjectURL(file))
		}
	}

	const handleEdit = () => {
		dropzoneRef.current?.open()
	}

	const handleSave = () => {
		if (!file) {
			return
		}

		onFileChange?.(file)
	}

	return (
		<div className="flex flex-col gap-2  pt-4 overflow-auto">
			<div className="relative">
				<Button
					size="sm"
					className="absolute z-10 border-tw-border-400 min-w-0 h-6 border right-0 top-0 translate-y-[-50%]"
					onClick={handleEdit}
				>
					Edit
				</Button>
				<Dropzone
					maxFiles={1}
					multiple={false}
					maxSize={10 * 1024 * 1024}
					accept={{
						'image/*': ImageMimeTypes
					}}
					ref={dropzoneRef}
					onDrop={handleDrop}
					disabled={disabled}
				>
					{({ getRootProps, getInputProps }) => (
						<div
							{...getRootProps()}
							className={cn(
								'overflow-auto',
								url
									? 'relative'
									: ' border-dashed border-zinc-400 border-2 bg-zinc-100 p-4 flex items-center justify-center text-zinc-600'
							)}
						>
							<input {...getInputProps()} name={name} />
							{url ? (
								<img
									src={url}
									alt={'preview'}
									className={'w-full object-cover aspect-video'}
								/>
							) : (
								<p>
									Drag &apos;n&apos; drop some files here, or click to select
									files
								</p>
							)}
						</div>
					)}
				</Dropzone>
			</div>
			<p>File formats supported- .jpeg, .jpg, .png, .webp</p>
			<div className="flex gap-2">
				<Button onClick={onCancel} className="flex-1" variant="faded">
					Cancel
				</Button>
				<Button
					onClick={handleSave}
					isDisabled={disabled || !file}
					className="flex-[5]"
					color="primary"
				>
					Save
				</Button>
			</div>
		</div>
	)
}
