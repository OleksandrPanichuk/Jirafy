'use client'

import { useProjectsFiltersStore } from '@/features/projects'
import { Network } from '@/types'
import { Checkbox, CheckboxGroup } from '@heroui/react'
import { IconLock, IconWorld } from '@tabler/icons-react'

interface IAccessSelectProps {
	searchValue?: string
}

const options = [
	{
		value: Network.PRIVATE,
		icon: <IconLock className={'size-3.5 mr-2'} />,
		label: 'Private'
	},
	{
		value: Network.PUBLIC,
		icon: <IconWorld className={'size-3.5 mr-2'} />,
		label: 'Public'
	}
]

export const AccessSelect = ({ searchValue }: IAccessSelectProps) => {
	const network = useProjectsFiltersStore((s) => s.network)
	const setNetwork = useProjectsFiltersStore((s) => s.setNetwork)

	const filteredOptions = options.filter((option) =>
		option.value.toLowerCase().includes(searchValue?.toLowerCase() ?? '')
	)

	if (!filteredOptions.length) {
		return (
			<p className="flex items-center w-full h-full text-xs text-tw-text-400">
				<i>No matches found</i>
			</p>
		)
	}

	return (
		<CheckboxGroup
			value={network}
			onValueChange={(v) => setNetwork(v as Network[])}
			classNames={{
				wrapper: 'gap-4'
			}}
			className="mt-2"
		>
			{filteredOptions.map((option) => (
				<Checkbox
					key={option.value}
					classNames={{
						base: `flex w-full items-center rounded p-1.5 hover:bg-tw-bg-80 w-full max-w-none `,
						label:
							'flex-grow truncate text-xs text-tw-text-200 flex items-center'
					}}
					size={'sm'}
					value={option.value}
				>
					{option.icon}
					{option.label}
				</Checkbox>
			))}
		</CheckboxGroup>
	)
}
