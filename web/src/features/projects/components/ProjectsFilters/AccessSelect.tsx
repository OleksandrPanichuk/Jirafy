'use client'

import { useProjectsFiltersStore } from '@/features/projects'
import { Network } from '@/types'
import { Checkbox, CheckboxGroup } from '@heroui/react'
import { IconLock, IconWorld } from '@tabler/icons-react'

// TODO: integrate search
export const AccessSelect = () => {
	const network = useProjectsFiltersStore((s) => s.network)
	const setNetwork = useProjectsFiltersStore((s) => s.setNetwork)

	return (
		<CheckboxGroup
			value={network}
			onValueChange={(v) => setNetwork(v as Network[])}
		>
			<Checkbox
				classNames={{
					base: 'flex w-full items-center rounded p-1.5 hover:bg-tw-bg-80 w-full max-w-none my-1',
					label:
						'flex-grow truncate text-xs text-tw-text-200 flex items-center '
				}}
				size={'sm'}
				value={Network.PRIVATE}
			>
				<IconLock className={'size-3.5 mr-2'} />
				Private
			</Checkbox>
			<Checkbox
				classNames={{
					base: 'flex w-full items-center rounded p-1.5 hover:bg-tw-bg-80 w-full max-w-none',
					label: 'flex-grow truncate text-xs text-tw-text-200 flex items-center'
				}}
				size={'sm'}
				value={Network.PUBLIC}
			>
				<IconWorld className={'size-3.5 mr-2'} />
				Public
			</Checkbox>
		</CheckboxGroup>
	)
}
