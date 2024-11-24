'use client'

import { createProjectSchema } from '@/api'
import { Input } from '@/components/ui'
import { ChangeEvent, useEffect } from 'react'
import { Control, ControllerRenderProps, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { generateIdentifier } from '../helpers'

type FormValues = z.infer<typeof createProjectSchema>

interface IIdentifierInputProps
	extends ControllerRenderProps<FormValues, 'identifier'> {
	control: Control<FormValues>
	inferProjectName?: boolean
}

export const IdentifierInput = ({
	control,
	inferProjectName,
	value,
	onChange,
	...field
}: IIdentifierInputProps) => {
	const projectName = useWatch({
		control,
		name: 'name',
		defaultValue: ''
	})

	useEffect(() => {
		if (!inferProjectName) return

		const identifier = generateIdentifier(projectName)
		if (
			!value ||
			value === identifier.slice(0, identifier.length - 1) ||
			value.slice(0, value.length - 1) === identifier
		) {
			onChange(identifier)
		}
	}, [projectName, value, onChange, inferProjectName])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(generateIdentifier(e.target.value))
	}
	return (
		<Input
			placeholder={'Project ID'}
			className="pr-6"
			maxLength={5}
			onChange={handleChange}
			value={value}
			{...field}
		/>
	)
}
