'use client'

import { InviteMembersInput, inviteMembersSchema } from '@/api'
import {
	Button,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem
} from '@/components/ui'
import { SocketEvents } from '@/constants'
import { MemberRoleSelect } from '@/features/members'
import { useChildrenWithProps, useDisclosure } from '@/hooks'
import { useSocket } from '@/providers'
import { MemberRole, MemberType, SocketNamespace } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Modal, ModalContent } from '@nextui-org/react'
import { IconPlus, IconX } from '@tabler/icons-react'
import { PropsWithChildren } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

type FormValues = {
	members: InviteMembersInput
}


interface IInvitationModalProps extends PropsWithChildren {
	type: MemberType
	identifier: string
}

const defaultValue: InviteMembersInput = [
	{
		email: '',
		role: MemberRole.MEMBER
	}
]

export const InvitationModal = ({
	children,
	type,
	identifier
}: IInvitationModalProps) => {
	const { isOpen, open, setIsOpen, close } = useDisclosure()

	const invitesSocket = useSocket(SocketNamespace.INVITES)

	const form = useForm<FormValues>({
		resolver: zodResolver(inviteMembersSchema),
		defaultValues: {
			members: defaultValue
		},
		mode: 'onBlur'
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'members'
	})

	const { control, handleSubmit, reset } = form

	const handleOpenChange = (isOpen: boolean) => {
		setIsOpen(isOpen)
	}

	const handleCancel = () => {
		reset({
			members: defaultValue
		})
		close()
	}

	const onSubmit = (values: FormValues) => {
		let rest

		switch (type) {
			case MemberType.WORKSPACE: {
				rest = { workspaceId: identifier }
				break
			}
			case MemberType.PROJECT: {
				rest = { projectId: identifier }
				break
			}
			default: {
				return
			}
		}
    
		 
		values.members.forEach((member) => {
			const payload = { ...member, ...rest }
			invitesSocket?.emit(SocketEvents.CREATE_INVITE, payload)
		})	
	}

	const childrenWithHandler = useChildrenWithProps(children, {
		onClick: open
	})

	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
				<ModalContent className="p-6">
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ul className="flex flex-col gap-3">
								{fields.map((group, index) => {
									return (
										<li className="flex w-full gap-3" key={group.id}>
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
														<FormError />
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
										</li>
									)
								})}
							</ul>

							<div className="flex justify-between">
								<button type="button" onClick={() => append(defaultValue[0])}>
									<IconPlus className="size-4" />
									Add another
								</button>
								<div>
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
