'use client'

import { CreateWorkspaceInput, createWorkspaceSchema } from '@/api'
import {
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui'
import {
	SizeSelect,
	SlugInput,
	useCreateWorkspaceMutation
} from '@/features/workspaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const CreateWorkspaceForm = () => {
	const [isWorkspaceInputFocused, setIsWorkspaceInputFocused] = useState(false)
	const router = useRouter()
	const form = useForm<CreateWorkspaceInput>({
		resolver: zodResolver(createWorkspaceSchema),
		defaultValues: {
			name: '',
			slug: ''
		},
		mode: 'onChange'
	})

	const { mutate: createWorkspace, isPending } = useCreateWorkspaceMutation()

	const {
		control,
		handleSubmit,
		formState: { isValid }
	} = form

	const onSubmit = (values: CreateWorkspaceInput) => createWorkspace(values)

	const onReset = () => {
		router.back()
	}

	return (
		<div className="space-y-7">
			<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
				Create your workspace
			</h2>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<FormField
						control={control}
						name="name"
						render={({ field: { onChange, onBlur, ...rest } }) => (
							<FormItem>
								<FormLabel withAsterisk>Workspace name</FormLabel>
								<FormControl>
									<Input
										variant="flat"
										placeholder="Enter workspace name..."
										onValueChange={onChange}
										classNames={{
											inputWrapper: 'rounded-md'
										}}
										onFocus={() => setIsWorkspaceInputFocused(true)}
										onBlur={() => {
											setIsWorkspaceInputFocused(false)
											onBlur()
										}}
										{...rest}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel withAsterisk>Workspace url</FormLabel>
								<FormControl>
									<SlugInput
										inferWorkspaceName={isWorkspaceInputFocused}
										control={control}
										{...field}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="size"
						render={({ field }) => (
							<FormItem>
								<FormLabel withAsterisk>
									What size is your organization?
								</FormLabel>
								<FormControl>
									<SizeSelect {...field} />
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<div className="space-x-3">
						<Button
							type="submit"
							className="rounded-md"
							color="primary"
							isDisabled={!isValid || isPending}
						>
							Create workspace
						</Button>
						<Button
							type="button"
							className="rounded-md"
							color="default"
							variant="light"
							onClick={onReset}
							disabled={isPending}
						>
							Go back
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
