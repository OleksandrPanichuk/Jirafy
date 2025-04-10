'use client'

import { ChannelsGroupInput, channelsGroupSchema } from '@/api'
import { useChannelsGroupModalStore } from '@/features/chat'
import {
	useCreateChannelsGroupMutation,
	useUpdateChannelsGroupMutation
} from '@/features/chat/api'
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

export const ChannelsGroupModal = () => {
	const { isOpen, variant, close, name, groupId } = useChannelsGroupModalStore()
	const workspace = useCurrentWorkspace()

	const form = useForm<ChannelsGroupInput>({
		resolver: zodResolver(channelsGroupSchema)
	})

	const { control, handleSubmit, reset } = form

	const { mutate: createChannelsGroup, isPending: isCreating } =
		useCreateChannelsGroupMutation()
	const { mutate: updateChannelsGroup, isPending: isUpdating } =
		useUpdateChannelsGroupMutation()

	const isDisabled = isCreating || isUpdating

	const onClose = () => {
		if (isDisabled) {
			return
		}
		close()
	}

	const onSubmit = (values: ChannelsGroupInput) => {
		if (variant === 'create') {
			createChannelsGroup(values, { onSuccess: close })
		} else {
			updateChannelsGroup(values, { onSuccess: close })
		}
	}

	useEffect(() => {
		reset({ name: name || '', workspaceId: workspace.id, groupId })
	}, [isOpen, name, groupId, reset, workspace.id])

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose}>
			<ModalContent>
				<ModalHeader>
					{variant === 'create' ? 'Create' : 'Edit'} channels group
				</ModalHeader>
				<ModalBody>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormField
								name={'name'}
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Channels group name</FormLabel>
										<FormControl>
											<Input
												size={'sm'}
												isDisabled={isDisabled}
												classNames={{
													inputWrapper: 'rounded'
												}}
												placeholder={'Channels group name'}
												{...field}
											/>
										</FormControl>
										<FormMessage className={'text-xs'} />
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
