'use client'

import { CreateProjectInput, createProjectSchema } from '@/api'
import { CoverPicker, useGetRandomImageQuery } from '@/features/images'
import {
	IdentifierInput,
	NetworkSelect,
	ProjectLeadSelect,
	useCreateProjectModalStore,
	useCreateProjectMutation
} from '@/features/projects'
import {
	Button,
	EmojiPicker,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	Input,
	Textarea
} from '@/features/shared'
import { useUploadFileMutation } from '@/features/storage'
import { useCurrentWorkspace } from '@/features/workspaces'
import { Network, TypeFile } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, Modal, ModalContent, Tooltip } from '@nextui-org/react'
import { IconInfoCircle, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const defaultValues: Partial<CreateProjectInput> = {
	name: '',
	identifier: '',
	network: Network.PUBLIC,
	emoji: '🙂'
}

type FormValues = z.infer<typeof createProjectSchema>

export const CreateProjectModal = () => {
	const currentWorkspace = useCurrentWorkspace()

	const { isOpen, close } = useCreateProjectModalStore()
	const [isNameInputFocused, setIsNameInputFocused] = useState(false)

	const form = useForm<FormValues>({
		resolver: zodResolver(createProjectSchema),
		mode: 'onBlur',
		defaultValues: {
			...defaultValues,
			workspaceId: currentWorkspace?.id
		}
	})

	const {
		setValue,
		control,
		handleSubmit,
		reset,
		formState: { isValid }
	} = form

	const { data: initialImage } = useGetRandomImageQuery({
		onSuccess: (url) => {
			setValue('cover', {
				url
			})
		}
	})

	const onCancel = () => {
		reset({
			cover: {
				url: initialImage?.urls.full
			},
			workspaceId: currentWorkspace?.id,
			...defaultValues
		})

		close()
	}

	const { mutateAsync: uploadFile } = useUploadFileMutation()
	const { mutateAsync: createProject } = useCreateProjectMutation()

	const onSubmit = async (values: FormValues) => {
		try {
			let cover: TypeFile | undefined = undefined

			if (values.cover instanceof File) {
				const { data } = await uploadFile(values.cover)
				cover = data
			}

			await createProject({
				...values,
				cover
			})
		} finally {
			onCancel()
		}
	}

	if (!isOpen) return null

	return (
		<Modal
			size="2xl"
			placement="center"
			classNames={{
				wrapper: '!items-center overflow-hidden'
			}}
			isOpen={isOpen}
			onClose={onCancel}
			hideCloseButton
		>
			<ModalContent className="min-h-[50vh] max-h-[90vh] bg-tw-bg-100 p-3 relative overflow-auto">
				<button onClick={onCancel} className="absolute top-6 right-6 z-10">
					<IconX className="size-5 text-white" />
				</button>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex w-full gap-4 flex-col "
					>
						<div className="w-full relative mb-4">
							<FormField
								control={control}
								name="cover"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<CoverPicker
												onChange={field.onChange}
												value={
													field.value instanceof File
														? field.value
														: field.value?.url
												}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="emoji"
								render={({ field }) => (
									<FormItem className="absolute bottom-0 translate-y-[50%] left-4 w-min">
										<EmojiPicker {...field} />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex w-full sm:flex-row flex-col gap-4">
							<FormField
								control={control}
								name="name"
								render={({ field: { onBlur, ...rest } }) => (
									<FormItem className="sm:flex-[4] md:flex-[5]">
										<FormControl>
											<Input
												placeholder={'Project'}
												onFocus={() => setIsNameInputFocused(true)}
												onBlur={() => {
													setIsNameInputFocused(false)
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
								name="identifier"
								render={({ field }) => (
									<FormItem className=" sm:flex-[2]">
										<div className="relative">
											<FormControl>
												<IdentifierInput
													inferProjectName={isNameInputFocused}
													control={control}
													{...field}
												/>
											</FormControl>
											<Tooltip
												content={
													<span className="text-xs">
														Helps you identify issues in the project uniquely.
														<br />
														Max 5 characters.
													</span>
												}
											>
												<div className="absolute top-[50%] right-2 translate-y-[-50%]">
													<IconInfoCircle className="size-5 text-neutral-600" />
												</div>
											</Tooltip>
										</div>
										<FormError />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder={'Description...'}
											className="min-h-[100px] resize-y"
											{...field}
										/>
									</FormControl>
									<FormError />
								</FormItem>
							)}
						/>
						<div className="flex gap-2">
							<FormField
								control={control}
								name="network"
								render={({ field }) => (
									<FormItem className="w-min">
										<FormControl>
											<NetworkSelect {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="leadId"
								render={({ field }) => (
									<FormItem className="w-min">
										<FormControl>
											<ProjectLeadSelect {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Divider />
						<div className="flex justify-end gap-2">
							<Button variant="ghost" size="sm" type="reset" onClick={onCancel}>
								Cancel
							</Button>
							<Button
								variant="primary"
								size="sm"
								isDisabled={!isValid}
								type="submit"
							>
								Create project
							</Button>
						</div>
					</form>
				</Form>
			</ModalContent>
		</Modal>
	)
}
