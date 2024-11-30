'use client'

import { Input } from '@/components/ui'
import { useGetUnsplashImagesQuery } from '@/features/image-pickers'
import { useDebounce } from '@/hooks'
import { Skeleton } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import Image from 'next/image'
import { useState } from 'react'

interface IUnsplashPickerProps {
	onChange: (url: string) => void
}

export const UnsplashPicker = ({ onChange }: IUnsplashPickerProps) => {
	const [searchValue, setSearchValue] = useState('')

	const debouncedSearchValue = useDebounce(searchValue)

	const { data: images, isLoading } = useGetUnsplashImagesQuery({
		query: debouncedSearchValue,
		count: 20
	})

	return (
		<div className="flex w-full gap-4 flex-col">
			<div className="w-full">
				<Input
					classNames={{
						wrapper: 'w-full',
						container: 'h-7'
					}}
					startContent={<IconSearch className="size-4 mr-2 " />}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Search for images"
				/>
			</div>
			{!images && !isLoading && (
				<div className="text-center w-full">No images found</div>
			)}
			{(images || isLoading) && (
				<ul className="w-full grid grid-cols-4 gap-4  overflow-auto">
					{images?.map((image) => (
						<li
							className="relative col-span-4 xs:col-span-2 aspect-video md:col-span-1 cursor-pointer overflow-hidden"
							onClick={() => onChange(image.urls.full)}
							key={image.id}
						>
							<div className="hover:bg-zinc-800  hover:bg-opacity-20 bg-transparent absolute w-full h-full transition-all left-0 top-0 z-10 " />
							<Image
								src={image.urls.small}
								alt={image.alt_description ?? 'unsplash-image'}
								objectFit="cover"
								fill
							/>
						</li>
					))}

					{isLoading &&
						Array.from({ length: 20 }).map((_, i) => (
							<Skeleton
								key={i}
								className="aspect-video col-span-4 xs:col-span-2 md:col-span-1"
								as="li"
							>
								<div className=" bg-default-200" />
							</Skeleton>
						))}
				</ul>
			)}
		</div>
	)
}
