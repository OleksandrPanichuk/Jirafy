'use client'

import { ChangeEmailInput, changeEmailSchema } from '@/api'
import { useChangeEmailMutation, useVerifyIdentityStore } from '@/features/auth'
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
import { useRouter } from 'next-nprogress-bar'
import { useForm } from 'react-hook-form'

export const ChangeEmailForm = () => {
	const router = useRouter()
	const form = useForm<ChangeEmailInput>({
		resolver: zodResolver(changeEmailSchema),
		defaultValues: {
			newEmail: ''
		}
	})
	const { isIdentityVerified } = useVerifyIdentityStore((s) => s)

	const { mutate: changeEmail, isPending } = useChangeEmailMutation()

	if (!isIdentityVerified) {
		return null
	}

	const { handleSubmit, control } = form

	const onSubmit = (values: ChangeEmailInput) =>
		changeEmail(values, {
			onSuccess: () => {
				router.back()
			}
		})

	return (
		<section className="max-w-lg w-full relative">
			<div>
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Change email address
				</h2>
				<p className="text-sm max-w-sm mt-2 text-neutral-300">
					Enter your new email address below.
				</p>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="my-8 flex flex-col "
					>
						<FormField
							control={control}
							name={'newEmail'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>New email address</FormLabel>
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
						<BottomGradientButton
							type="submit"
							className={'mt-4'}
							isDisabled={isPending}
						>
							Change email address &rarr;
						</BottomGradientButton>
					</form>
				</Form>
			</div>
		</section>
	)
}
