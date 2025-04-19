'use client'

import {
	CreateChannelInput,
	createChannelSchema,
	UpdateChannelInput,
	updateChannelSchema
} from '@/api'
import {
	ChannelTypeSelect,
	GroupSelect,
	ModalVariants,
	useChannelsModalStore,
	useCreateChannelMutation,
	useUpdateChannelMutation
} from '@/features/chat'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/features/shared'
import { useCurrentWorkspace } from '@/features/workspaces'
import { ChannelType } from '@/types'
import {
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = CreateChannelInput | UpdateChannelInput

export const ChannelsModal = () => {
	const { isOpen, close, data, variant } = useChannelsModalStore()

	const workspace = useCurrentWorkspace()

	const form = useForm<FormValues>({
		resolver: zodResolver(
			variant === ModalVariants.CREATE
				? createChannelSchema
				: updateChannelSchema
		)
	})

	const { control, handleSubmit, reset } = form

	const { mutate: createChannel, isPending: isCreating } =
		useCreateChannelMutation()
	const { mutate: updateChannel, isPending: isUpdating } =
		useUpdateChannelMutation()

	const isDisabled = isCreating || isUpdating

	const isGroupSelectDisabled =
		variant === ModalVariants.CREATE && !!data?.groupId

	const onClose = () => {
		if (isDisabled) {
			return
		}

		close()
	}

	const onSubmit = (values: FormValues) => {
		if (variant === ModalVariants.CREATE) {
			createChannel(values as CreateChannelInput, {
				onSuccess: close
			})
		} else {
			updateChannel(values as UpdateChannelInput, {
				onSuccess: close
			})
		}
	}

	useEffect(() => {
		reset({ workspaceId: workspace.id, type: ChannelType.TEXT, ...data })
	}, [isOpen, data, reset, workspace.id])

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose} placement='center' >
			<ModalContent>
				<ModalHeader>
					{variant === 'create' ? 'Create' : 'Edit'} channel
				</ModalHeader>
				<ModalBody>
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={'flex flex-col gap-4'}
						>
							<FormField
								name={'name'}
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Channel name</FormLabel>
										<FormControl>
											<Input
												size={'sm'}
												isDisabled={isDisabled}
												classNames={{
													inputWrapper: 'rounded'
												}}
												placeholder={'Channel name'}
												{...field}
											/>
										</FormControl>
										<FormMessage className={'text-xs'} />
									</FormItem>
								)}
							/>
							<FormField
								name={'type'}
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Channel type</FormLabel>
										<FormControl>
											<ChannelTypeSelect {...field} disabled={isDisabled} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name={'groupId'}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Channels group</FormLabel>
										<FormControl>
											<GroupSelect
												{...field}
												disabled={isDisabled || isGroupSelectDisabled}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className={'mt-3 flex justify-end gap-2'}>
								<Button
									onPress={onClose}
									size={'sm'}
									variant={'ghost'}
									type={'button'}
									isDisabled={isDisabled}
								>
									Cancel
								</Button>
								<Button
									size={'sm'}
									variant={'primary'}
									type="submit"
									isDisabled={isDisabled}
								>
									{variant === 'create' ? 'Create' : 'Update'}
								</Button>
							</div>
						</form>
					</Form>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
