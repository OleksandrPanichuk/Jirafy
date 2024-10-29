'use client'

import { AuthApi, type SignUpInput, signUpSchema } from '@/api'
import {
	BottomGradientButton,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	Input
} from '@/components/ui'
import { Routes } from '@/constants'
import { useSignUpMutation } from '@/features/auth'
import { cn } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

interface ISignUpFormProps {
	defaultValues?: Partial<SignUpInput>
	withoutOAuth?: boolean
}

export const SignUpForm = ({
	defaultValues,
	withoutOAuth
}: ISignUpFormProps) => {
	const form = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: defaultValues?.email ?? '',
			password: '',
			confirmPassword: '',
			firstName: defaultValues?.firstName ?? '',
			lastName: defaultValues?.lastName ?? '',
			avatar: defaultValues?.avatar,
			verified: defaultValues?.verified,
			username: defaultValues?.username ?? ''
		},
		mode: 'onBlur'
	})

	const { handleSubmit, control } = form

	const { mutate: signUp, isPending } = useSignUpMutation()

	const onSubmit = (values: SignUpInput) => signUp(values)

	return (
		<div>
			<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
				Welcome to Jirafy
			</h2>
			<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
				Sign up to create an account
			</p>
			<Form {...form}>
				<form className="my-8" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex md:flex-row flex-col  gap-2 mb-4">
						<FormField
							control={control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="Tyler"
											{...field}
										/>
									</FormControl>
									<FormError />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="Durden"
											{...field}
										/>
									</FormControl>
									<FormError />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={control}
						name="username"
						render={({ field }) => (
							<FormItem className={'mb-4'}>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										disabled={isPending}
										placeholder="unique username"
										{...field}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="email"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="email"
										placeholder="example@gmail.com"
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
							<FormItem className="mb-4">
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="password"
										placeholder="••••••••"
										disabled={isPending}
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
									<Input
										{...field}
										type="password"
										placeholder="••••••••"
										disabled={isPending}
									/>
								</FormControl>
								<FormError />
							</FormItem>
						)}
					/>

					<BottomGradientButton type="submit" isDisabled={isPending}>
						Sign up &rarr;
					</BottomGradientButton>

					<p className="my-2 text-sm font-medium">
						Already have an account?{' '}
						<Link
							href={Routes.SIGN_IN}
							className={cn(
								'text-tw-blue hover:underline',
								isPending && 'cursor-not-allowed pointer-events-none'
							)}
						>
							Sign In
						</Link>
					</p>

					{!withoutOAuth && (
						<>
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
									<span className=":text-neutral-300 text-sm">Google</span>
								</BottomGradientButton>
							</div>
						</>
					)}
				</form>
			</Form>
		</div>
	)
}
