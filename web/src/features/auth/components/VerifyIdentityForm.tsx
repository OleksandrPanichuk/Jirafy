'use client'

import { VerifyIdentityInput, verifyIdentitySchema } from '@/api'
import {
	useVerifyIdentityMutation,
	useVerifyIdentityStore
} from '@/features/auth'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Form where user inputs his password to verify his identity. After verification he will access ChangeEmailForm
export const VerifyIdentityForm = () => {
	const form = useForm<VerifyIdentityInput>({
		resolver: zodResolver(verifyIdentitySchema),
		defaultValues: {
			password: ''
		}
	})
	const { isIdentityVerified } = useVerifyIdentityStore((s) => s)

	const { mutate: verifyIdentity, isPending } = useVerifyIdentityMutation()

	const onSubmit = (values: VerifyIdentityInput) => verifyIdentity(values)

	if (isIdentityVerified) {
		return null
	}

	const { control, handleSubmit } = form

	return (
		<section className="max-w-lg w-full relative">
			<div>
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Please, verify your identity
				</h2>
				<p className="text-sm max-w-sm mt-2 text-neutral-300">
					To access your account, you need to verify your identity. Please,
					enter your password below.
				</p>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="my-8 flex flex-col "
					>
						<FormField
							control={control}
							name={'password'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="••••••••"
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormError />
								</FormItem>
							)}
						/>
						<BottomGradientButton
							type="submit"
							className={'mt-4'}
							isDisabled={isPending}
						>
							Verify Identity &rarr;
						</BottomGradientButton>
					</form>
				</Form>
			</div>
		</section>
	)
}
