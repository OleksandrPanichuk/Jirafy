'use client'

import { CreateWorkspaceInput } from '@/api'
import { APP_DOMAIN } from '@/constants'
import { generateSlug } from '@/features/workspaces'
import { Input } from "@heroui/react"
import { useEffect } from 'react'
import { Control, ControllerRenderProps, useWatch } from 'react-hook-form'

interface ISlugInputProps
	extends ControllerRenderProps<CreateWorkspaceInput, 'slug'> {
	control: Control<CreateWorkspaceInput>
	inferWorkspaceName?: boolean
}

export const SlugInput = ({
	control,
	value,
	onChange,
	inferWorkspaceName,
	onBlur
}: ISlugInputProps) => {
	const workspaceName = useWatch({
		control,
		name: 'name',
		defaultValue: ''
	})

	useEffect(() => {
		if (!inferWorkspaceName) return

		const generatedSlug = generateSlug(workspaceName)
		if (
			!value ||
			value === generatedSlug.slice(0, generatedSlug.length - 1) ||
			value.slice(0, value.length - 1) === generatedSlug
		) {
			onChange(generatedSlug)
		}
	}, [workspaceName, value, onChange, inferWorkspaceName])

	const handleChange = (value: string) => {
		onChange(generateSlug(value))
	}

	return (
		<Input
			variant="flat"
			startContent={
				<span className="text-neutral-400 text-sm">{APP_DOMAIN}/</span>
			}
			classNames={{
				input: '!ps-0 placeholder:text-neutral-500',
				inputWrapper: 'rounded-md'
			}}
			placeholder="Enter workspace url..."
			onValueChange={handleChange}
			value={value}
			onBlur={onBlur}
		/>
	)
}
