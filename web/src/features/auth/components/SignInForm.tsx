'use client'

import { AuthApi, SignInInput, signInSchema } from '@/api'
import { Routes } from '@/constants'
import { useSignInMutation } from '@/features/auth'
import {
	BottomGradientButton,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	Input,
	PasswordInput
} from '@/features/shared'
import { cn } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export const SignInForm = () => {
	const form = useForm<SignInInput>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onBlur'
	})

	const { handleSubmit, control } = form

	const { mutate: signIn, isPending } = useSignInMutation()

	const onSubmit = (values: SignInInput) => signIn(values)
	return (
		<div>
			<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
				Welcome back to Jirafy
			</h2>
			<p className="text-sm max-w-sm mt-2 text-neutral-300">
				Sign in to your account
			</p>
			<Form {...form}>
				<form className="my-8 flex flex-col " onSubmit={handleSubmit(onSubmit)}>
					<FormField
						control={control}
						name="email"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="example@gmail.com"
										type="email"
										disabled={isPending}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="password"
						render={({ field }) => (
							<FormItem>
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

					<Link
						className={cn(
							'text-sm  self-end mt-2 text-neutral-300 hover:text-neutral-400 transition-colors mb-4',
							isPending && 'pointer-events-none cursor-not-allowed'
						)}
						href={Routes.FORGOT_PASSWORD}
					>
						Forgot password?
					</Link>

					<BottomGradientButton type="submit" isDisabled={isPending}>
						Sign In &rarr;
					</BottomGradientButton>

					<p className="my-2 text-sm font-medium">
						Do not have an account?{' '}
						<Link
							href={Routes.SIGN_UP}
							className={cn(
								'text-tw-blue hover:underline',
								isPending && 'pointer-events-none cursor-not-allowed'
							)}
						>
							Create One!
						</Link>
					</p>

					<div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

					<div className="flex flex-col space-y-4">
						<BottomGradientButton
							className="flex items-center justify-start"
							type="button"
							onClick={AuthApi.githubOAuth}
							isDisabled={isPending}
						>
							<IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
							<span className="text-neutral-300 text-sm">GitHub</span>
						</BottomGradientButton>
						<BottomGradientButton
							className="flex items-center justify-start"
							type="button"
							onClick={AuthApi.googleOAuth}
							isDisabled={isPending}
						>
							<IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
							<span className="text-neutral-300 text-sm">Google</span>
						</BottomGradientButton>
					</div>
				</form>
			</Form>
		</div>
	)
}
