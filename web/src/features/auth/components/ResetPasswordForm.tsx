'use client'

import { useForm } from 'react-hook-form'
import {
	BottomGradientButton,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	PasswordInput
} from '@/features/shared'
import Link from 'next/link'
import { Routes } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordInput, resetPasswordSchema } from '@/api'
import { useResetPasswordMutation } from '@/features/auth'

interface IResetPasswordFormProps {
	token: string
}

export const ResetPasswordForm = ({ token }: IResetPasswordFormProps) => {
	const form = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			token,
			password: '',
			confirmPassword: ''
		},
		mode: 'onBlur'
	})

	const { mutate: resetPassword, isPending } = useResetPasswordMutation()

	const {
		control,
		handleSubmit,
		formState: { isValid }
	} = form

	const onSubmit = (values: ResetPasswordInput) => resetPassword(values)

	return (
		<div className={'h-[90vh] flex flex-col justify-center items-center'}>
			<div className={'w-full'}>
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Reset Password?
				</h2>
				<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
					Enter your new password
				</p>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className={'my-8 space-y-4'}>
						<FormField
							control={control}
							name="password"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput
											placeholder="••••••••"
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
								<FormItem className="mb-4">
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<PasswordInput
											{...field}
											placeholder="••••••••"
											disabled={isPending}
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
							Reset Password
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
