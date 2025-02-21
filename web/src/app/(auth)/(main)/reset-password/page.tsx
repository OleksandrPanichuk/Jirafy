import { verifyResetPasswordToken } from '@/api'
import { notFound } from 'next/navigation'
import { ResetPasswordForm } from '@/features/auth'

interface IResetPasswordPageProps {
	searchParams: Promise<{
		token?: string
	}>
}

const ResetPasswordPage = async ({ searchParams }: IResetPasswordPageProps) => {
	const { token } = await searchParams

	if (!token) {
		return notFound()
	}

	const verified = await verifyResetPasswordToken({ token })

	if (!verified) {
		return notFound()
	}

	return <ResetPasswordForm token={token} />
}

export default ResetPasswordPage
