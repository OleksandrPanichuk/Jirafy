'use client'

import {
	BottomGradientButton,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	Input
} from '@/features/shared'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	SendResetPasswordTokenInput,
	sendResetPasswordTokenSchema
} from '@/api'
import Link from 'next/link'
import { Routes } from '@/constants'
import { useSendResetPasswordTokenMutation } from '@/features/auth'

export const ForgotPasswordForm = () => {
	const form = useForm<SendResetPasswordTokenInput>({
		resolver: zodResolver(sendResetPasswordTokenSchema),
		defaultValues: {
			email: ''
		}
	})

	const { mutate: sendResetPasswordToken, isPending } =
		useSendResetPasswordTokenMutation()

	const {
		control,
		handleSubmit,
		formState: { isValid }
	} = form

	const onSubmit = (values: SendResetPasswordTokenInput) =>
		sendResetPasswordToken(values)

	return (
		<div className={'h-[90vh] flex flex-col justify-center items-center'}>
			<div className={'w-full'}>
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Forgot Password?
				</h2>
				<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
					Enter your email to reset your password
				</p>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className={'my-8 space-y-4'}>
						<FormField
							control={control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											placeholder="example@gmail.com"
											type="email"
											disabled={isPending}
											{...field}
										/>
									</FormControl>
									<FormError />
								</FormItem>
							)}
						/>
						<BottomGradientButton
							isDisabled={!isValid || isPending}
							type="submit"
						>
							Send link
						</BottomGradientButton>
						<Link
							className={
								'w-full text-tw-text-300 hover:text-tw-text-200 focus:text-tw-text-100 px-5  font-medium text-sm rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center'
							}
							href={Routes.SIGN_IN}
						>
							Back to sign in
						</Link>
					</form>
				</Form>
			</div>
		</div>
	)
}
