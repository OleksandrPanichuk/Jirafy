'use client'

import { UpdateUserPasswordInput, updateUserPasswordSchema } from '@/api'
import { useUpdateUserPasswordMutation } from '@/features/profile'
import {
	Button,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	PasswordInput
} from '@/features/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider } from "@heroui/react"
import { useForm } from 'react-hook-form'

const defaultValues = {
	currentPassword: '',
	newPassword: '',
	confirmPassword: ''
}

export const ChangePasswordForm = () => {
	const form = useForm<UpdateUserPasswordInput>({
		resolver: zodResolver(updateUserPasswordSchema),
		defaultValues,
		mode: 'onBlur'
	})

	const { mutate: updatePassword, isPending } = useUpdateUserPasswordMutation()

	const {
		control,
		handleSubmit,
		reset,
		formState: { isValid }
	} = form

	const onSubmit = (values: UpdateUserPasswordInput) => {
		updatePassword(values, {
			onSuccess: () => {
				reset(defaultValues)
			}
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" w-full my-16 lg:w-2/3 mx-auto px-3 gap-4 flex flex-col items-start"
			>
				<h2>Change password</h2>
				<Divider />
				<div className="flex flex-col gap-8 max-w-96 w-full">
					<FormField
						control={control}
						name="currentPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Current password</FormLabel>
								<FormControl>
									<PasswordInput
										size="sm"
										placeholder="Old password"
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="newPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<PasswordInput
										size="sm"
										placeholder="Enter new password"
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<PasswordInput
										size="sm"
										placeholder="Confirm new password"
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" size="sm" isDisabled={!isValid || isPending}>
					Change password
				</Button>
			</form>
		</Form>
	)
}
