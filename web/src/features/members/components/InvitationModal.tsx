'use client'

import { InviteMembersInput, inviteMembersSchema } from '@/api'
import {
	Button,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	Input
} from '@/components/ui'
import { useChildrenWithProps, useDisclosure } from '@/hooks'
import { MemberRole } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalContent } from '@nextui-org/react'
import { IconX } from '@tabler/icons-react'
import { PropsWithChildren } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { MemberRoleSelect } from './MemberRoleSelect'

type FormValues = {
	members: InviteMembersInput
}

interface IInviteModalProps extends PropsWithChildren {}

const defaultValue: InviteMembersInput = [
	{
		email: '',
		role: MemberRole.MEMBER
	}
]

export const InvitationModal = ({ children }: IInviteModalProps) => {
	const { isOpen, open, setIsOpen, close } = useDisclosure()

	const form = useForm<FormValues>({
		resolver: zodResolver(inviteMembersSchema),
		defaultValues: {
			members: defaultValue
		}
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
		console.log(values)
	}

	const childrenWithHandler = useChildrenWithProps(children, {
		onClick: open
	})

	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
				<ModalContent>
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
																type="email"
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
													<IconX />
												</button>
											)}
										</li>
									)
								})}
							</ul>

							<div>
								<button type="button" onClick={() => append(defaultValue[0])}>
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
