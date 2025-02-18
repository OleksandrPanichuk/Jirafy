'use client'
import { useAuth, useSendVerificationLinkMutation } from '@/features/auth'
import { Logo } from '@/features/shared'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { useState } from 'react'

export const VerificationCard = () => {
	const { user } = useAuth((s) => s)
	const [step, setStep] = useState<'WAS_SENT' | 'NOT_SENT'>('NOT_SENT')

	const { mutate: sendVerificationLink, isPending } =
		useSendVerificationLinkMutation({
			onSuccess: () => {
				if (step !== 'WAS_SENT') {
					setStep('WAS_SENT')
				}
			}
		})

	if (!user) {
		return null
	}

	const onSendVerificationLink = () =>
		sendVerificationLink({ email: user.email })
	const onResendVerificationLink = () =>
		sendVerificationLink({ email: user.email })

	return (
		<section className="max-w-lg w-full relative">
			<div className="absolute bg-neutral-900 rounded-full p-2 top-0 translate-x-[-50%] translate-y-[-50%] left-[50%] z-10">
				<Logo />
			</div>
			<Card className="bg-zinc-800 rounded-lg w-full">
				<CardHeader className="flex justify-center text-2xl pt-8">
					Please, verify your email
				</CardHeader>
				<CardBody>
					<div className="flex flex-col items-center justify-center p-4">
						{step === 'NOT_SENT' ? (
							<>
								<div className="text-center">
									<p className="text-sm">
										To access your account, you need to verify your email.
										Please, click the button below to send a verification link
										to your email.
									</p>
								</div>
								<Button
									onClick={onSendVerificationLink}
									isLoading={isPending}
									className="mt-4 text-neutral-900 bg-neutral-100 hover:bg-neutral-200"
								>
									Send verification link
								</Button>
							</>
						) : (
							<>
								<div className="text-center">
									<p className="text-sm">
										We have sent a verification link to your email. Please,
										check your inbox and follow the instructions to verify your
										email.
									</p>
								</div>
								<Button
									onClick={onResendVerificationLink}
									isLoading={isPending}
									className="mt-4 text-neutral-900 bg-neutral-100 hover:bg-neutral-200"
								>
									Resend verification link
								</Button>
							</>
						)}
					</div>
				</CardBody>
			</Card>
		</section>
	)
}
