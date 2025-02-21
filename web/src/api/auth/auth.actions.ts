'use server'

import { AuthApi, VerifyResetPasswordTokenInput } from '@/api'

export async function verifyResetPasswordToken(
	input: VerifyResetPasswordTokenInput
) {
	try {
		await AuthApi.verifyResetPasswordToken(input)
		return true
	} catch {
		// TODO: maybe show some message to user
		return false
	}
}
