'use client'

import { InviteMembersInput, inviteMembersSchema } from '@/api'
import { SocketEvents } from '@/constants'
import { MemberRoleSelect } from '@/features/members'
import {
	Button,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem
} from '@/features/shared'
import { useCurrentWorkspace } from '@/features/workspaces'
import { useChildrenWithProps, useDisclosure } from '@/hooks'
import { useSocket } from '@/providers'
import { MemberRole, SocketNamespace } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Modal, ModalContent } from "@heroui/react"
import { IconPlus, IconX } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	members: inviteMembersSchema
})

type FormValues = z.infer<typeof formSchema>

const defaultValue: InviteMembersInput = [
	{
		email: '',
		role: MemberRole.MEMBER
	}
]

export const InvitationModal = ({ children }: PropsWithChildren) => {
	const { isOpen, open, close } = useDisclosure()
	const currentWorkspace = useCurrentWorkspace()

	const invitesSocket = useSocket(SocketNamespace.INVITES)

	const queryClient = useQueryClient()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			members: defaultValue
		},
		mode: 'onBlur'
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'members'
	})

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = form

	const handleCancel = () => {
		reset({
			members: defaultValue
		})
		close()
	}

	const handleOpenChange = (isOpen: boolean) => {
		if (isOpen) {
			open()
		} else {
			handleCancel()
		}
	}

	const onSubmit = (values: FormValues) => {
		const workspaceId = currentWorkspace.id
		values.members.forEach((member) => {
			const payload = { ...member, workspaceId }
			invitesSocket?.emit(SocketEvents.CREATE_INVITE, payload)
		})

		queryClient.invalidateQueries({
			queryKey: ['workspace-invites', { workspaceId }]
		})

		handleCancel()
	}

	const childrenWithHandler = useChildrenWithProps(children, {
		onClick: open
	})

	return (
		<>
			{childrenWithHandler}
			<Modal
				isOpen={isOpen}
				onOpenChange={handleOpenChange}
				hideCloseButton={true}
			>
				<ModalContent className="p-5 max-h-[80vh] overflow-y-auto">
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ul className="flex flex-col gap-3">
								{fields.map((group, index) => {
									const emailError = errors?.members?.[index]?.email
									return (
										<li className="flex w-full gap-3 flex-col" key={group.id}>
											<div className={'flex gap-3'}>
												<FormField
													control={control}
													name={`members.${index}.email`}
													render={({ field }) => (
														<FormItem className="flex-[5]">
															<FormControl>
																<Input
																	variant="bordered"
																	type="email"
																	classNames={{
																		inputWrapper:
																			' rounded border-tw-border-200 group-data-[focus=true]:!border-tw-border-200 group-data-[hover=true]:!border-tw-border-200 min-h-0 h-8 border-[1px]'
																	}}
																	placeholder={'name@company.com'}
																	{...field}
																/>
															</FormControl>
														</FormItem>
													)}
												/>
												<FormField
													control={control}
													name={`members.${index}.role`}
													render={({ field }) => (
														<FormItem className="flex-[1]">
															<FormControl>
																<MemberRoleSelect {...field} />
															</FormControl>
														</FormItem>
													)}
												/>
												{fields.length > 1 && (
													<button onClick={() => remove(index)}>
														<IconX className="size-4" />
													</button>
												)}
											</div>
											{emailError && (
												<FormError>{emailError.message}</FormError>
											)}
										</li>
									)
								})}
							</ul>

							<div className="flex justify-between mt-4">
								<button
									type="button"
									className={'text-sm flex items-center gap-2'}
									onClick={() => append(defaultValue[0])}
								>
									<IconPlus className="size-4" />
									Add another
								</button>
								<div className={'space-x-2'}>
									<Button
										size="sm"
										variant="ghost"
										type="button"
										onPress={handleCancel}
									>
										Cancel
									</Button>
									<Button size="sm" variant="primary" type="submit">
										Invite
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</ModalContent>
			</Modal>
		</>
	)
}
